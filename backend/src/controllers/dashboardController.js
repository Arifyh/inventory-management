const prisma = require("../utils/prisma");

const getDashboardStats = async (req, res) => {
  try {
    // 1. Fetch products to get counts and stock levels
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: {
        id: true,
        stock: true,
        minStock: true
      }
    });

    const totalProducts = products.length;
    const lowStockCount = products.filter(p => p.stock <= p.minStock).length;

    // 2. Count categories
    const totalCategories = await prisma.category.count();

    // 3. Count transactions today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const totalTransactionsToday = await prisma.transaction.count({
      where: {
        date: {
          gte: startOfToday
        }
      }
    });

    // 4. Fetch recent activity (last 5 transactions)
    const recentActivity = await prisma.transaction.findMany({
      take: 5,
      orderBy: { date: "desc" },
      include: {
        product: { select: { name: true, sku: true, unit: true } },
        user: { select: { name: true, email: true } }
      }
    });

    // 5. Fetch transactions from last 7 days for weekly trends
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const recentTransactions = await prisma.transaction.findMany({
      where: {
        date: {
          gte: sevenDaysAgo
        }
      },
      select: {
        type: true,
        quantity: true,
        date: true,
        productId: true,
        product: { select: { name: true, sku: true } }
      }
    });

    // Compile 7-day weekly movement trend (IN vs OUT)
    const weeklyMovement = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayLabel = d.toLocaleDateString("id-ID", { weekday: "short" });
      const dateLabel = d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
      const keyDate = d.toDateString();

      let stockIn = 0;
      let stockOut = 0;

      recentTransactions.forEach(t => {
        const tDate = new Date(t.date);
        if (tDate.toDateString() === keyDate) {
          if (t.type === "IN") {
            stockIn += t.quantity;
          } else if (t.type === "OUT") {
            stockOut += t.quantity;
          }
        }
      });

      weeklyMovement.push({
        label: `${dayLabel} (${dateLabel})`,
        in: stockIn,
        out: stockOut
      });
    }

    // 6. Category Distribution
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: { where: { isActive: true } } }
        }
      }
    });

    const categoryDistribution = categories.map(c => ({
      name: c.name,
      count: c._count.products
    }));

    // 7. Top Moving Products (by transaction volume in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const monthlyTransactions = await prisma.transaction.findMany({
      where: {
        date: {
          gte: thirtyDaysAgo
        }
      },
      include: {
        product: { select: { name: true, sku: true } }
      }
    });

    const productMovements = {};
    monthlyTransactions.forEach(t => {
      if (!t.product) return;
      if (!productMovements[t.productId]) {
        productMovements[t.productId] = {
          productId: t.productId,
          name: t.product.name,
          sku: t.product.sku,
          inVolume: 0,
          outVolume: 0,
          totalVolume: 0
        };
      }
      if (t.type === "IN") {
        productMovements[t.productId].inVolume += t.quantity;
      } else if (t.type === "OUT") {
        productMovements[t.productId].outVolume += t.quantity;
      }
      productMovements[t.productId].totalVolume += t.quantity;
    });

    const topMovingProducts = Object.values(productMovements)
      .sort((a, b) => b.totalVolume - a.totalVolume)
      .slice(0, 5);

    res.json({
      totalProducts,
      lowStockCount,
      totalCategories,
      totalTransactionsToday,
      recentActivity,
      weeklyMovement,
      categoryDistribution,
      topMovingProducts
    });
  } catch (error) {
    res.status(500).json({ message: "Error compiling dashboard statistics", error: error.message });
  }
};

module.exports = {
  getDashboardStats
};

const prisma = require("../utils/prisma");

const getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        product: { select: { name: true, sku: true, unit: true } },
        supplier: { select: { name: true } },
        user: { select: { name: true, email: true } },
      },
      orderBy: { date: "desc" },
    });
    res.json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { type, productId, quantity, supplierId, notes, date } = req.body;
    const userId = req.user.id; // from auth middleware

    if (!type || !productId || quantity === undefined || quantity === null || quantity === "") {
      return res
        .status(400)
        .json({ message: "Type, product, and valid quantity are required" });
    }

    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity === 0) {
      return res.status(400).json({ message: "Quantity cannot be zero or invalid" });
    }

    if (type !== "ADJUSTMENT" && parsedQuantity < 0) {
      return res.status(400).json({ message: "Quantity must be greater than zero" });
    }

    if (type !== "IN" && type !== "OUT" && type !== "ADJUSTMENT") {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    if (type === "IN" && !supplierId) {
      return res
        .status(400)
        .json({ message: "Supplier is required for Stock In" });
    }

    // Use a transaction to ensure both records update correctly
    const result = await prisma.$transaction(async (tx) => {
      // 1. Check current product
      const product = await tx.product.findUnique({
        where: { id: parseInt(productId) },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      // 2. Calculate new stock
      let newStock = product.stock;
      if (type === "IN") {
        newStock += parseInt(quantity);
      } else if (type === "OUT") {
        if (product.stock < parseInt(quantity)) {
          throw new Error(
            `Insufficient stock. Current stock is ${product.stock}`,
          );
        }
        newStock -= parseInt(quantity);
      } else if (type === "ADJUSTMENT") {
        newStock += parseInt(quantity);
        if (newStock < 0) {
          throw new Error(`Insufficient stock. Adjustment results in negative stock (${newStock}). Current stock is ${product.stock}`);
        }
      }

      // 3. Update product stock
      await tx.product.update({
        where: { id: parseInt(productId) },
        data: { stock: newStock },
      });

      // 4. Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          type,
          productId: parseInt(productId),
          quantity: parseInt(quantity),
          supplierId: supplierId ? parseInt(supplierId) : null,
          userId: parseInt(userId),
          notes,
          date: date ? new Date(date) : undefined,
        },
        include: {
          product: { select: { name: true, sku: true, unit: true } },
          supplier: { select: { name: true } },
          user: { select: { name: true, email: true } },
        },
      });

      // 5. Create notification for admin if transaction is triggered by STAFF
      if (req.user.role === "STAFF") {
        const staffName = req.user.name || req.user.email;
        const typeText = type === "IN" ? "Stok Masuk" : type === "OUT" ? "Stok Keluar" : "Penyesuaian";
        await tx.notification.create({
          data: {
            title: `Aktivitas Staff: ${typeText}`,
            message: `${staffName} mencatat ${typeText} sebanyak ${quantity} ${transaction.product.unit} untuk produk "${transaction.product.name}".`,
            type: "TRANSACTION",
          },
        });
      }

      return transaction;
    });

    res
      .status(201)
      .json({
        message: "Transaction created successfully",
        transaction: result,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
};

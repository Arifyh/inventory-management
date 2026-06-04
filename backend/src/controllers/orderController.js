const prisma = require("../utils/prisma");

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, notes } = req.body;
    const userId = req.user.id; // From authMiddleware

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Pesanan tidak boleh kosong" });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        shippingAddress,
        notes,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json({ message: "Pesanan berhasil dibuat", order });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error.message,
      stack: error.stack,
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isThumbnail: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.payOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    let paymentProofPath = null;

    console.log("Pay order request - ID:", id, "User ID:", userId);
    console.log("File received:", req.file);

    if (req.file) {
      paymentProofPath = `/uploads/${req.file.filename}`;
      console.log("Payment proof path:", paymentProofPath);
    } else {
      console.log("No file uploaded");
    }

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { items: true },
    });

    console.log("Order found:", order ? "Yes" : "No");

    if (!order) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    }

    if (order.userId !== userId && req.user.role === "VISITOR") {
      return res.status(403).json({ message: "Tidak diizinkan" });
    }

    if (order.status !== "PENDING") {
      return res
        .status(400)
        .json({ message: "Pesanan sudah dibayar atau dibatalkan" });
    }

    // Update with payment proof and status PAID
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        status: "PAID",
        paymentProof: paymentProofPath,
      },
    });

    console.log("Order updated successfully");
    res.json({
      message: "Pembayaran berhasil disimulasikan",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Pay order error:", error);
    console.error("Error stack:", error.stack);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

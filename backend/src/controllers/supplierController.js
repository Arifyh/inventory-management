const prisma = require('../utils/prisma');

const getSuppliers = async (req, res) => {
  try {
    const { search } = req.query;
    
    let whereClause = {};
    if (search) {
      whereClause = {
        name: {
          contains: search
        }
      };
    }

    const suppliers = await prisma.supplier.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
  }
};

const createSupplier = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({ message: 'Name, phone, and address are required' });
    }

    const supplier = await prisma.supplier.create({
      data: {
        name,
        phone,
        address
      }
    });

    res.status(201).json({ message: 'Supplier created successfully', supplier });
  } catch (error) {
    res.status(500).json({ message: 'Error creating supplier', error: error.message });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({ message: 'Name, phone, and address are required' });
    }

    const supplier = await prisma.supplier.update({
      where: { id: parseInt(id) },
      data: {
        name,
        phone,
        address
      }
    });

    res.json({ message: 'Supplier updated successfully', supplier });
  } catch (error) {
    res.status(500).json({ message: 'Error updating supplier', error: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.supplier.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier', error: error.message });
  }
};

module.exports = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier
};

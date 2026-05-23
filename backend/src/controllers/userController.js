const bcrypt = require('bcryptjs');
const prisma = require('../utils/prisma');

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role || 'STAFF'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        role
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    });

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Admin cannot disable themselves
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ message: 'You cannot disable your own account' });
    }

    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        isActive: !user.isActive
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    });

    res.json({ message: `User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`, user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling user status', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Admin cannot delete themselves
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    const user = await prisma.user.findUnique({ 
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { transactions: true }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user._count.transactions > 0) {
      return res.status(400).json({ message: 'Gagal menghapus: Pengguna ini memiliki riwayat transaksi. Silakan nonaktifkan statusnya saja.' });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  toggleUserStatus,
  deleteUser
};

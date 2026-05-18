const prisma = require('../utils/prisma');
const fs = require('fs');
const path = require('path');

const generateSKU = async (categoryId) => {
  const category = await prisma.category.findUnique({ where: { id: parseInt(categoryId) } });
  const prefix = category ? category.name.substring(0, 3).toUpperCase() : 'PRD';
  const count = await prisma.product.count({ where: { categoryId: parseInt(categoryId) } });
  return `${prefix}-${(count + 1).toString().padStart(4, '0')}`;
};

const getProducts = async (req, res) => {
  try {
    // Only fetch active products
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: { select: { id: true, name: true } },
        images: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findFirst({
      where: { id: parseInt(id), isActive: true },
      include: {
        category: { select: { id: true, name: true } },
        images: true
      }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, categoryId, description, unit, minStock, price } = req.body;

    const sku = await generateSKU(categoryId);

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        description,
        unit: unit || 'Pcs',
        minStock: minStock ? parseInt(minStock) : 0,
        price: price ? parseFloat(price) : 0,
        categoryId: parseInt(categoryId)
      },
      include: {
        category: { select: { id: true, name: true } },
        images: true
      }
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, description, unit, minStock, price } = req.body;

    const existingProduct = await prisma.product.findFirst({
      where: { id: parseInt(id), isActive: true }
    });

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const data = {
      name,
      description,
      unit,
      minStock: minStock ? parseInt(minStock) : undefined,
      price: price ? parseFloat(price) : undefined
    };

    if (categoryId && parseInt(categoryId) !== existingProduct.categoryId) {
      data.categoryId = parseInt(categoryId);
      // Optional: Generate new SKU if category changes? usually SKU shouldn't change.
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data,
      include: {
        category: { select: { id: true, name: true } },
        images: true
      }
    });

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

const softDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.update({
      where: { id: parseInt(id) },
      data: { isActive: false }
    });

    res.json({ message: 'Product soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

const togglePublishStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: { id: parseInt(id), isActive: true }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { isPublished: !product.isPublished }
    });

    res.json({ message: `Product ${updatedProduct.isPublished ? 'published' : 'unpublished'} successfully`, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling publish status', error: error.message });
  }
};

// IMAGE MANAGEMENT

const uploadProductImages = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image' });
    }

    const product = await prisma.product.findFirst({
      where: { id: parseInt(id), isActive: true },
      include: { images: true }
    });

    if (!product) {
      // Remove uploaded files if product not found
      files.forEach(file => fs.unlinkSync(file.path));
      return res.status(404).json({ message: 'Product not found' });
    }

    let hasThumbnail = product.images.some(img => img.isThumbnail);

    const imageCreates = files.map((file, index) => {
      const isThumb = !hasThumbnail && index === 0;
      if (isThumb) hasThumbnail = true;
      
      return {
        url: `/uploads/${file.filename}`,
        isThumbnail: isThumb
      };
    });

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        images: {
          create: imageCreates
        }
      },
      include: { images: true }
    });

    res.status(201).json({ message: 'Images uploaded successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading images', error: error.message });
  }
};

const deleteProductImage = async (req, res) => {
  try {
    const { id, imageId } = req.params;

    const image = await prisma.productImage.findUnique({
      where: { id: parseInt(imageId) }
    });

    if (!image || image.productId !== parseInt(id)) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '../../public', image.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.productImage.delete({
      where: { id: parseInt(imageId) }
    });

    // If it was thumbnail, make the oldest remaining image the thumbnail
    if (image.isThumbnail) {
      const oldestImage = await prisma.productImage.findFirst({
        where: { productId: parseInt(id) },
        orderBy: { createdAt: 'asc' }
      });

      if (oldestImage) {
        await prisma.productImage.update({
          where: { id: oldestImage.id },
          data: { isThumbnail: true }
        });
      }
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { images: true }
    });

    res.json({ message: 'Image deleted successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
};

const setThumbnail = async (req, res) => {
  try {
    const { id, imageId } = req.params;

    // Reset all thumbnails for this product
    await prisma.productImage.updateMany({
      where: { productId: parseInt(id) },
      data: { isThumbnail: false }
    });

    // Set the new thumbnail
    await prisma.productImage.update({
      where: { id: parseInt(imageId) },
      data: { isThumbnail: true }
    });

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { images: true }
    });

    res.json({ message: 'Thumbnail updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error setting thumbnail', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  softDeleteProduct,
  togglePublishStatus,
  uploadProductImages,
  deleteProductImage,
  setThumbnail
};

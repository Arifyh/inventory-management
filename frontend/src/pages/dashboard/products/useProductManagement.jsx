import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Image Modal state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentProductForImages, setCurrentProductForImages] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    unit: 'Pcs',
    price: 0,
    minStock: 0
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        categoryId: product.categoryId,
        description: product.description || '',
        unit: product.unit,
        price: product.price,
        minStock: product.minStock
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
        description: '',
        unit: 'Pcs',
        price: 0,
        minStock: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const openImageModal = (product) => {
    setCurrentProductForImages(product);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setCurrentProductForImages(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, 
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post('http://localhost:5000/api/products', 
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      
      closeModal();
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini? (Soft Delete)')) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting product');
    }
  };

  const handleTogglePublish = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`http://localhost:5000/api/products/${id}/toggle-publish`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error toggling publish status');
    }
  };

  const handleUploadImages = async (productId, files) => {
    if (files.length === 0) return;
    
    const formDataObj = new FormData();
    for (let i = 0; i < files.length; i++) {
      formDataObj.append('images', files[i]);
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:5000/api/products/${productId}/images`, formDataObj, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setCurrentProductForImages(response.data.product);
      fetchProducts(); // Refresh list to get new thumbnails
    } catch (err) {
      alert(err.response?.data?.message || 'Error uploading images');
    }
  };

  const handleDeleteImage = async (productId, imageId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${productId}/images/${imageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentProductForImages(response.data.product);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting image');
    }
  };

  const handleSetThumbnail = async (productId, imageId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(`http://localhost:5000/api/products/${productId}/images/${imageId}/thumbnail`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentProductForImages(response.data.product);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error setting thumbnail');
    }
  };

  return {
    products,
    categories,
    loading,
    error,
    isModalOpen,
    editingProduct,
    formData,
    setFormData,
    openModal,
    closeModal,
    handleSubmit,
    handleDelete,
    handleTogglePublish,
    
    // Image Modal
    isImageModalOpen,
    currentProductForImages,
    openImageModal,
    closeImageModal,
    handleUploadImages,
    handleDeleteImage,
    handleSetThumbnail
  };
}

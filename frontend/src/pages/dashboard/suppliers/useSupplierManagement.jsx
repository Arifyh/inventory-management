import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useSupplierManagement() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const fetchSuppliers = async (searchQuery = '') => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/suppliers?search=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuppliers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch suppliers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuppliers(search);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const openModal = (supplier = null) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({
        name: supplier.name,
        phone: supplier.phone,
        address: supplier.address
      });
    } else {
      setEditingSupplier(null);
      setFormData({
        name: '',
        phone: '',
        address: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (editingSupplier) {
        await axios.put(`http://localhost:5000/api/suppliers/${editingSupplier.id}`, 
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post('http://localhost:5000/api/suppliers', 
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      
      closeModal();
      fetchSuppliers(search);
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving supplier');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus supplier ini?')) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSuppliers(search);
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting supplier');
    }
  };

  return {
    suppliers,
    loading,
    error,
    search,
    setSearch,
    isModalOpen,
    editingSupplier,
    formData,
    setFormData,
    openModal,
    closeModal,
    handleSubmit,
    handleDelete
  };
}

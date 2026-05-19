import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useTransactionManagement() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('IN'); // IN, OUT, ADJUSTMENT
  
  // Form state
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    supplierId: '',
    notes: '',
    date: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [transRes, prodRes, supRes] = await Promise.all([
        axios.get('http://localhost:5000/api/transactions', { headers }),
        axios.get('http://localhost:5000/api/products', { headers }),
        axios.get('http://localhost:5000/api/suppliers', { headers })
      ]);
      
      setTransactions(transRes.data);
      setProducts(prodRes.data);
      setSuppliers(supRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transaction data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (type) => {
    setTransactionType(type);
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);
    setFormData({
      productId: products.length > 0 ? products[0].id : '',
      quantity: '',
      supplierId: type === 'IN' ? (suppliers.length > 0 ? suppliers[0].id : '') : '',
      notes: '',
      date: localISOTime
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const payload = {
        ...formData,
        type: transactionType
      };
      
      // Remove supplierId if it's not IN
      if (transactionType !== 'IN') {
        delete payload.supplierId;
      }
      
      await axios.post('http://localhost:5000/api/transactions', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      closeModal();
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing transaction');
    }
  };

  return {
    transactions,
    products,
    suppliers,
    loading,
    error,
    isModalOpen,
    transactionType,
    formData,
    setFormData,
    openModal,
    closeModal,
    handleSubmit
  };
}

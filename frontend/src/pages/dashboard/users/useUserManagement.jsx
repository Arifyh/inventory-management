import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'STAFF'
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        email: user.email,
        name: user.name || '',
        password: '', // blank for edit
        role: user.role
      });
    } else {
      setEditingUser(null);
      setFormData({
        email: '',
        name: '',
        password: '',
        role: 'STAFF'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/api/users/${editingUser.id}`, 
          { name: formData.name, role: formData.role },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post('http://localhost:5000/api/users', 
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      
      closeModal();
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving user');
    }
  };

  const toggleStatus = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`http://localhost:5000/api/users/${id}/toggle-status`, 
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error toggling user status');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return;
    
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting user');
    }
  };

  return {
    users,
    loading,
    error,
    isModalOpen,
    editingUser,
    formData,
    setFormData,
    openModal,
    closeModal,
    handleSubmit,
    toggleStatus,
    deleteUser
  };
}

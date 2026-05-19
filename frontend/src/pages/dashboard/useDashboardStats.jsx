import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useDashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const res = await axios.get('http://localhost:5000/api/dashboard/stats', { headers });
      setStats(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat statistik dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refreshStats: fetchStats
  };
}

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useHistoryManagement() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // ALL, IN, OUT, ADJUSTMENT
  const [filterProduct, setFilterProduct] = useState('ALL');
  const [filterUser, setFilterUser] = useState('ALL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [transRes, prodRes] = await Promise.all([
        axios.get('http://localhost:5000/api/transactions', { headers }),
        axios.get('http://localhost:5000/api/products', { headers })
      ]);

      setTransactions(transRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat data riwayat');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Extract unique users/staff from transactions for filtering
  const uniqueUsers = Array.from(
    new Map(
      transactions.map((t) => [t.userId, { id: t.userId, name: t.user?.name, email: t.user?.email }])
    ).values()
  );

  // Filtered transactions
  const filteredTransactions = transactions.filter((t) => {
    // 1. Search Query (Product Name, SKU, Notes, User Name/Email)
    const matchesSearch = 
      t.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.notes && t.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.user.name && t.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.user.email.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Type Filter
    const matchesType = filterType === 'ALL' || t.type === filterType;

    // 3. Product Filter
    const matchesProduct = filterProduct === 'ALL' || t.productId.toString() === filterProduct;

    // 4. User Filter
    const matchesUser = filterUser === 'ALL' || t.userId.toString() === filterUser;

    // 5. Date Range Filter
    let matchesDate = true;
    const transDate = new Date(t.date || t.createdAt);
    
    if (startDate) {
      const start = new Date(startDate);
      // Set start to start of the day
      start.setHours(0, 0, 0, 0);
      matchesDate = matchesDate && transDate >= start;
    }
    
    if (endDate) {
      const end = new Date(endDate);
      // Set end to end of the day
      end.setHours(23, 59, 59, 999);
      matchesDate = matchesDate && transDate <= end;
    }

    return matchesSearch && matchesType && matchesProduct && matchesUser && matchesDate;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setFilterType('ALL');
    setFilterProduct('ALL');
    setFilterUser('ALL');
    setStartDate('');
    setEndDate('');
  };

  return {
    transactions: filteredTransactions,
    allProducts: products,
    uniqueUsers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterProduct,
    setFilterProduct,
    filterUser,
    setFilterUser,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    resetFilters,
    refreshData: fetchData
  };
}

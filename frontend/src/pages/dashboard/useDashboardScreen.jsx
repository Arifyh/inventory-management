import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackageSearch, 
  ArrowRightLeft, 
  Tags 
} from 'lucide-react';

export default function useDashboardScreen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: PackageSearch, label: 'Produk', path: '/dashboard/products', active: false },
    { icon: ArrowRightLeft, label: 'Transaksi', path: '/dashboard/transactions', active: false },
    { icon: Tags, label: 'Kategori', path: '/dashboard/categories', active: false },
  ];

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    user,
    navItems,
    handleLogout
  };
}

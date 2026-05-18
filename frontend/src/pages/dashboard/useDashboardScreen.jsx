import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackageSearch, 
  ArrowRightLeft, 
  Tags,
  Users,
  Truck,
  History
} from 'lucide-react';

export default function useDashboardScreen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    { label: 'Ringkasan', icon: LayoutDashboard, path: '/dashboard', active: location.pathname === '/dashboard' },
    { label: 'Katalog Produk', icon: PackageSearch, path: '/dashboard/products', active: location.pathname === '/dashboard/products' },
    { label: 'Kategori', icon: Tags, path: '/dashboard/categories', active: location.pathname === '/dashboard/categories' },
    { label: 'Supplier', icon: Truck, path: '/dashboard/suppliers', active: location.pathname === '/dashboard/suppliers' },
    { label: 'Transaksi', icon: ArrowRightLeft, path: '/dashboard/transactions', active: location.pathname === '/dashboard/transactions' },
    { label: 'Riwayat', icon: History, path: '/dashboard/history', active: location.pathname === '/dashboard/history' },
  ];

  if (user?.role === 'ADMIN') {
    navItems.push({ icon: Users, label: 'Pengguna', path: '/dashboard/users' });
  }

  // Set active state based on current path
  const activeNavItems = navItems.map(item => ({
    ...item,
    active: location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
  }));

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    user,
    navItems: activeNavItems,
    handleLogout
  };
}

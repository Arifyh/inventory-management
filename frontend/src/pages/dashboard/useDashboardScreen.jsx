import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackageSearch, 
  ArrowRightLeft, 
  Tags,
  Users
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
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PackageSearch, label: 'Produk', path: '/dashboard/products' },
    { icon: ArrowRightLeft, label: 'Transaksi', path: '/dashboard/transactions' },
    { icon: Tags, label: 'Kategori', path: '/dashboard/categories' },
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

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import useDashboardScreen from './useDashboardScreen';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import DashboardHome from './DashboardHome';
import UserManagement from './users/UserManagement';
import CategoryManagement from './categories/CategoryManagement';
import SupplierManagement from './suppliers/SupplierManagement';
import ProductManagement from './products/ProductManagement';
import TransactionManagement from './transactions/TransactionManagement';
import HistoryManagement from './history/HistoryManagement';

export default function Dashboard() {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    user,
    navItems,
    handleLogout
  } = useDashboardScreen();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex font-sans print:bg-white print:block">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        navItems={navItems} 
        user={user} 
        handleLogout={handleLogout} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden print:overflow-visible print:block">
        <Topbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={user} />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8 lg:p-12 print:overflow-visible print:p-0 print:block">
          <Routes>
            <Route path="/" element={<DashboardHome user={user} />} />
            <Route path="/users" element={user.role === 'ADMIN' ? <UserManagement /> : <div className="p-8 bg-white border border-red-200 text-red-700 rounded-sm">Akses Ditolak. Halaman ini hanya untuk Administrator.</div>} />
            <Route path="/categories" element={user.role === 'ADMIN' ? <CategoryManagement /> : <div className="p-8 bg-white border border-red-200 text-red-700 rounded-sm">Akses Ditolak. Halaman ini hanya untuk Administrator.</div>} />
            <Route path="/suppliers" element={user.role === 'ADMIN' ? <SupplierManagement /> : <div className="p-8 bg-white border border-red-200 text-red-700 rounded-sm">Akses Ditolak. Halaman ini hanya untuk Administrator.</div>} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/transactions" element={<TransactionManagement />} />
            <Route path="/history" element={<HistoryManagement />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

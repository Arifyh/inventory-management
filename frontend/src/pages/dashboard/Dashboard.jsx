import React from 'react';
import { Routes, Route } from 'react-router-dom';

import useDashboardScreen from './useDashboardScreen';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import DashboardHome from './DashboardHome';
import UserManagement from './users/UserManagement';
import CategoryManagement from './categories/CategoryManagement';

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
    <div className="min-h-screen bg-[#f5f0e8] flex font-sans">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        navItems={navItems} 
        user={user} 
        handleLogout={handleLogout} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8 lg:p-12">
          <Routes>
            <Route path="/" element={<DashboardHome user={user} />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

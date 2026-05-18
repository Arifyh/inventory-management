import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, PackageSearch, X } from 'lucide-react';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, navItems, user, handleLogout }) {
  const navigate = useNavigate();
  return (
    <aside 
      className={`${
        isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
      } fixed inset-y-0 left-0 z-50 bg-[#0d0d0d] text-white transition-all duration-300 ease-in-out md:relative font-sans border-r border-white/10 overflow-hidden whitespace-nowrap`}
    >
      <div className="w-64 h-full flex flex-col">
      <div className="p-8 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <PackageSearch className="w-6 h-6 text-[#8b6914]" />
          </div>
          {isSidebarOpen && <span className="text-xl font-bold tracking-[0.2em] uppercase">Ikonik</span>}
        </div>
        <button 
          className="md:hidden text-white/50 hover:text-white transition-colors"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="px-4 py-8">
        <div className="mb-6 px-4">
          <p className="text-[10px] font-bold text-[#8b6914] uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-4 h-px bg-[#8b6914]" /> Menu Utama
          </p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all text-sm tracking-wide ${
                item.active 
                  ? 'bg-[#8b6914]/10 text-[#8b6914] font-medium border-l-[3px] border-[#8b6914]' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80 border-l-[3px] border-transparent'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-full border border-[#8b6914]/30 bg-[#8b6914]/10 flex items-center justify-center text-[#8b6914] font-bold text-sm">
            {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-white truncate tracking-wider">
              {user?.role === 'ADMIN' ? 'Administrator' : (user?.name || user?.email)}
            </p>
            <p className="text-[10px] text-[#c8b89a] uppercase tracking-[0.1em] mt-1">{user?.role}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.2em] text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all rounded-sm font-bold border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </button>
      </div>
      </div>
    </aside>
  );
}

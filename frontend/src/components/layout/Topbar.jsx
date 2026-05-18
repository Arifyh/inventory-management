import React from "react";
import { Menu, Bell } from "lucide-react";

export default function Topbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <header className="bg-[#f5f0e8] border-b border-[#0d0d0d]/10 sticky top-0 z-40">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#0d0d0d]/50 hover:text-[#0d0d0d] transition-colors p-2 rounded-sm"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b6914]">
            <div className="h-px w-6 bg-[#8b6914]" />
            Sistem Kendali
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative text-[#0d0d0d]/40 hover:text-[#0d0d0d] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#8b6914] rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

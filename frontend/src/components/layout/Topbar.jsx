import React, { useState, useEffect, useRef } from "react";
import { Menu, Bell, Check, CheckCheck, Calendar } from "lucide-react";
import useNotifications from "../../hooks/useNotifications";

export default function Topbar({ isSidebarOpen, setIsSidebarOpen, user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications(user);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationClick = (e, notif) => {
    e.stopPropagation();
    if (!notif.isRead) {
      markAsRead(notif.id);
    }
  };

  return (
    <header className="bg-[#f5f0e8] border-b border-[#0d0d0d]/10 sticky top-0 z-40 print:hidden">
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
          {user && user.role === "ADMIN" && (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`relative p-2 rounded-full transition-all border ${
                  dropdownOpen 
                    ? "bg-[#0d0d0d] text-white border-[#0d0d0d]" 
                    : "text-[#0d0d0d]/60 hover:text-[#0d0d0d] hover:bg-[#0d0d0d]/5 border-transparent"
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#f5f0e8] animate-bounce"></span>
                )}
              </button>

              {/* Dropdown Card */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-[#0d0d0d]/10 rounded-sm shadow-xl z-50 overflow-hidden">
                  {/* Dropdown Header */}
                  <div className="bg-[#f5f0e8]/80 px-4 py-3 border-b border-[#0d0d0d]/10 flex justify-between items-center">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0d0d0d]">Notifikasi</h4>
                      <p className="text-[9px] text-[#6b6456] mt-0.5">{unreadCount} belum dibaca</p>
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          markAllAsRead();
                        }}
                        className="text-[9px] font-bold uppercase tracking-[0.05em] text-[#8b6914] hover:underline flex items-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> Semua Dibaca
                      </button>
                    )}
                  </div>

                  {/* Dropdown Content */}
                  <div className="max-h-72 overflow-y-auto divide-y divide-[#0d0d0d]/5">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        onClick={(e) => handleNotificationClick(e, notif)}
                        className={`p-4 flex gap-3 text-left transition-colors cursor-pointer relative hover:bg-[#f5f0e8]/20 ${
                          !notif.isRead ? "bg-[#8b6914]/5" : ""
                        }`}
                      >
                        {!notif.isRead && (
                          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#8b6914] rounded-full" />
                        )}
                        
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0d0d0d]">{notif.title}</span>
                            <span className="text-[8px] text-[#6b6456]/60 font-mono mt-0.5">
                              {new Date(notif.createdAt).toLocaleDateString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-[#6b6456] leading-relaxed pr-2">{notif.message}</p>
                          <div className="flex items-center gap-1 text-[8px] text-[#6b6456]/50">
                            <Calendar className="w-2.5 h-2.5" />
                            {new Date(notif.createdAt).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'short'
                            })}
                          </div>
                        </div>

                        {!notif.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notif.id);
                            }}
                            className="h-6 w-6 rounded-full border border-slate-200 hover:border-[#8b6914] flex items-center justify-center text-slate-400 hover:text-[#8b6914] self-center transition-colors bg-white shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}

                    {notifications.length === 0 && (
                      <div className="p-8 text-center text-[#6b6456] text-xs">
                        Tidak ada notifikasi aktivitas staff.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

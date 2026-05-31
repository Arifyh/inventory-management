import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, ShoppingBag, CreditCard, ArrowLeft, Home } from "lucide-react";

export default function VisitorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#0d0d0d] font-sans antialiased flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#0d0d0d]/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="h-9 w-9 bg-[#0d0d0d] text-white flex items-center justify-center font-bold tracking-wider text-sm rounded-sm">
              IK
            </Link>
            <div>
              <h1 className="text-lg font-bold uppercase tracking-[0.1em] text-[#0d0d0d]">
                Ikonik Portal
              </h1>
              <p className="text-[10px] text-[#8b6914] font-bold uppercase tracking-widest mt-0.5">
                Visitor Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs font-bold uppercase tracking-wider text-[#6b6456] hover:text-[#0d0d0d] flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              Katalog
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 border border-red-200 hover:bg-red-50 text-red-600 px-3.5 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm text-center shadow-sm">
            <div className="w-20 h-20 bg-[#8b6914]/15 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#8b6914]/30">
              <User className="w-10 h-10 text-[#8b6914]" />
            </div>
            <h3 className="font-bold text-lg text-[#0d0d0d]">{user.name || "Visitor"}</h3>
            <p className="text-xs text-[#6b6456] font-mono mt-1">{user.email}</p>
            <div className="mt-4 inline-flex items-center gap-1.5 bg-[#8b6914]/10 text-[#8b6914] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-sm">
              Visitor Member
            </div>
          </div>

          {/* Quick Menu */}
          <div className="bg-white border border-[#0d0d0d]/10 rounded-sm overflow-hidden shadow-sm">
            <div className="px-4 py-3 bg-[#f5f0e8]/50 border-b border-[#0d0d0d]/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b6456]">Menu Navigasi</span>
            </div>
            <div className="divide-y divide-[#0d0d0d]/5">
              <Link to="/" className="flex items-center gap-2.5 px-4 py-3 text-xs text-[#6b6456] hover:text-[#0d0d0d] hover:bg-[#f5f0e8]/20 transition-all font-medium">
                <ShoppingBag className="w-4 h-4 text-[#8b6914]" />
                Belanja Material Baru
              </Link>
              <div className="flex items-center gap-2.5 px-4 py-3 text-xs text-[#6b6456]/40 cursor-not-allowed font-medium">
                <CreditCard className="w-4 h-4" />
                Pesanan Saya (Fase 2)
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dashboard Welcome & Stats */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-[#0d0d0d]/10 p-8 rounded-sm shadow-sm relative overflow-hidden">
            {/* Geometric Accent Line */}
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#8b6914]" />

            <h2 className="text-2xl font-light tracking-tight text-[#0d0d0d]">
              Halo, <span className="font-semibold text-[#8b6914]">{user.name || "Visitor"}</span>!
            </h2>
            <p className="text-sm text-[#6b6456] mt-2 max-w-xl leading-relaxed">
              Selamat datang di portal visitor Ikonik. 
            </p>
          </div>

          {/* Stats Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#0d0d0d]/10 p-5 rounded-sm shadow-sm flex items-center gap-4">
              <div className="p-3 bg-[#f5f0e8] text-[#8b6914] rounded-sm">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b6456]">Pesanan Aktif</p>
                <h4 className="text-xl font-bold text-[#0d0d0d] mt-1 font-mono">0</h4>
              </div>
            </div>

            <div className="bg-white border border-[#0d0d0d]/10 p-5 rounded-sm shadow-sm flex items-center gap-4">
              <div className="p-3 bg-[#f5f0e8] text-[#8b6914] rounded-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b6456]">Menunggu Pembayaran</p>
                <h4 className="text-xl font-bold text-[#0d0d0d] mt-1 font-mono">0</h4>
              </div>
            </div>

            <div className="bg-white border border-[#0d0d0d]/10 p-5 rounded-sm shadow-sm flex items-center gap-4">
              <div className="p-3 bg-[#f5f0e8] text-[#8b6914] rounded-sm">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b6456]">Total Transaksi</p>
                <h4 className="text-xl font-bold text-[#0d0d0d] mt-1 font-mono">Rp 0</h4>
              </div>
            </div>
          </div>

          {/* Features roadmap / info box */}
          <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0d0d0d] border-b border-[#0d0d0d]/5 pb-2">Informasi Akun & Aktivitas</h4>
            <div className="text-xs text-[#6b6456] space-y-2.5 leading-relaxed">
              <div className="flex items-center justify-between">
                <span>Tanggal Terdaftar</span>
                <span className="font-mono text-[#0d0d0d]">Hari ini</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Metode Pembayaran Tersimpan</span>
                <span className="text-[#0d0d0d]">Belum ada</span>
              </div>
              <p className="text-[10.5px] italic text-[#8b6914]/80 mt-2 bg-[#8b6914]/5 p-3 rounded-sm border border-[#8b6914]/10">
                Fitur keranjang belanja dan checkout pesanan sedang dikembangkan dan akan siap pada Fase 2.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

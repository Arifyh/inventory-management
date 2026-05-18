import React from "react";
import { PackageSearch, ArrowRightLeft, Tags } from "lucide-react";
import EmptyState from "../../components/ui/EmptyState";
import StatCard from "../../components/ui/StatCard";

export default function DashboardHome({ user }) {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Welcome Header */}
      <div>
        <div className="mb-4 inline-flex items-center gap-2 border border-[#8b6914]/20 bg-[#8b6914]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b6914]">
          <div className="h-1.5 w-1.5 rounded-full bg-[#8b6914]" />
          Ringkasan Utama
        </div>
        <h2 className="text-4xl font-light text-[#0d0d0d] mb-4">
          Selamat Datang, <br />
          <span className="font-bold">{user.email}</span>
        </h2>
        <p className="text-[#6b6456] max-w-xl text-sm leading-relaxed">
          Anda masuk sebagai {user.role}. Di sini Anda bisa memantau dan
          mengelola semua aktivitas inventaris, pergerakan barang, dan
          ketersediaan stok material bangunan Ikonik.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Produk" value="---" icon={PackageSearch} />
        <StatCard
          title="Transaksi Hari Ini"
          value="---"
          icon={ArrowRightLeft}
        />
        <StatCard title="Stok Menipis" value="---" icon={Tags} />
      </div>

      {/* Content Area */}
      <EmptyState
        title="Panel Kontrol Kosong"
        description="Belum ada data aktivitas hari ini. Gunakan menu sidebar untuk mulai menambahkan produk atau memproses transaksi masuk dan keluar."
      />
    </div>
  );
}

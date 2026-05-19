import React from 'react';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Scale, 
  Search, 
  Filter, 
  Calendar, 
  RotateCcw, 
  Printer, 
  Package, 
  User,
  Layers
} from 'lucide-react';
import useHistoryManagement from './useHistoryManagement';

export default function HistoryManagement() {
  const {
    transactions,
    allProducts,
    uniqueUsers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterProduct,
    setFilterProduct,
    filterUser,
    setFilterUser,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    resetFilters
  } = useHistoryManagement();

  if (loading) return <div className="p-8 text-[#6b6456]">Memuat data riwayat...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  // Calculate quick summary metrics based on filtered transactions
  const totalQuantityIn = transactions
    .filter(t => t.type === 'IN')
    .reduce((sum, t) => sum + t.quantity, 0);

  const totalQuantityOut = transactions
    .filter(t => t.type === 'OUT')
    .reduce((sum, t) => sum + t.quantity, 0);

  const totalAdjustments = transactions
    .filter(t => t.type === 'ADJUSTMENT')
    .reduce((sum, t) => sum + t.quantity, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 print:p-0 print:space-y-4">
      {/* Header (hidden in print, or stylized) */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 print:border-b print:pb-4 print:border-[#0d0d0d]/10">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 border border-[#8b6914]/20 bg-[#8b6914]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b6914] print:hidden">
            <div className="h-1.5 w-1.5 rounded-full bg-[#8b6914]" />
            Audit Trail & Pelacakan
          </div>
          <h2 className="text-3xl font-light text-[#0d0d0d]">Riwayat Transaksi</h2>
          <p className="text-xs text-[#6b6456] mt-1 hidden print:block">
            Laporan Cetak Transaksi Stok - {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        <div className="flex items-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#f5f0e8] text-[#0d0d0d] border border-[#0d0d0d]/20 px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#0d0d0d]/5 transition-all"
          >
            <Printer className="w-4 h-4" /> Cetak Laporan
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 print:grid-cols-4">
        <div className="bg-white border border-[#0d0d0d]/10 p-5 rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6456]">Total Transaksi</p>
            <h3 className="text-2xl font-light text-[#0d0d0d] mt-1">{transactions.length}</h3>
          </div>
          <div className="h-10 w-10 bg-[#f5f0e8] flex items-center justify-center rounded-sm text-[#8b6914]">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#0d0d0d]/10 p-5 rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6456]">Total Stok Masuk</p>
            <h3 className="text-2xl font-semibold text-green-600 mt-1">+{totalQuantityIn}</h3>
          </div>
          <div className="h-10 w-10 bg-green-50 border border-green-100 flex items-center justify-center rounded-sm text-green-600">
            <ArrowDownRight className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#0d0d0d]/10 p-5 rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6456]">Total Stok Keluar</p>
            <h3 className="text-2xl font-semibold text-red-600 mt-1">-{totalQuantityOut}</h3>
          </div>
          <div className="h-10 w-10 bg-red-50 border border-red-100 flex items-center justify-center rounded-sm text-red-600">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#0d0d0d]/10 p-5 rounded-sm shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6456]">Penyesuaian Stok</p>
            <h3 className="text-2xl font-semibold text-slate-600 mt-1">
              {totalAdjustments > 0 ? '+' : ''}{totalAdjustments}
            </h3>
          </div>
          <div className="h-10 w-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-sm text-slate-600">
            <Scale className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Section (hidden in print) */}
      <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm space-y-6 print:hidden">
        <div className="flex items-center gap-2 border-b border-[#0d0d0d]/5 pb-3">
          <Filter className="w-4 h-4 text-[#8b6914]" />
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0d0d0d]">Filter & Pencarian Audit</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Search Query */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b6456]">Cari Produk / SKU / User</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full border border-[#0d0d0d]/10 rounded-sm px-3 py-2 pl-9 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d0d0d]/30" />
            </div>
          </div>

          {/* Transaction Type */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b6456]">Jenis Transaksi</label>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="w-full border border-[#0d0d0d]/10 rounded-sm px-3 py-2 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none bg-white"
            >
              <option value="ALL">Semua Jenis</option>
              <option value="IN">Stok Masuk (IN)</option>
              <option value="OUT">Stok Keluar (OUT)</option>
              <option value="ADJUSTMENT">Penyesuaian (ADJUSTMENT)</option>
            </select>
          </div>

          {/* Product Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b6456]">Produk Spesifik</label>
            <div className="relative">
              <select
                value={filterProduct}
                onChange={e => setFilterProduct(e.target.value)}
                className="w-full border border-[#0d0d0d]/10 rounded-sm px-3 py-2 pl-9 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none bg-white"
              >
                <option value="ALL">Semua Produk</option>
                {allProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d0d0d]/30" />
            </div>
          </div>

          {/* User/Staff Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b6456]">Oleh Staff (Auditor)</label>
            <div className="relative">
              <select
                value={filterUser}
                onChange={e => setFilterUser(e.target.value)}
                className="w-full border border-[#0d0d0d]/10 rounded-sm px-3 py-2 pl-9 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none bg-white"
              >
                <option value="ALL">Semua Staff</option>
                {uniqueUsers.map(u => (
                  <option key={u.id} value={u.id}>{u.name || u.email}</option>
                ))}
              </select>
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d0d0d]/30" />
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b6456]">Dari Tanggal</label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full border border-[#0d0d0d]/10 rounded-sm px-3 py-2 pl-9 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d0d0d]/30" />
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b6456]">Sampai Tanggal</label>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full border border-[#0d0d0d]/10 rounded-sm px-3 py-2 pl-9 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d0d0d]/30" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-3 lg:col-span-2 flex items-end gap-2 pt-2">
            <button
              onClick={resetFilters}
              className="flex items-center justify-center gap-2 border border-[#0d0d0d]/20 text-[#6b6456] px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#f5f0e8] hover:text-[#0d0d0d] transition-all w-full md:w-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filter
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-[#0d0d0d]/10 rounded-sm overflow-hidden shadow-sm print:border-none print:shadow-none">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f5f0e8] border-b border-[#0d0d0d]/10 text-[10px] uppercase tracking-[0.2em] text-[#6b6456]">
              <th className="px-6 py-4 font-bold">Tanggal & Auditor</th>
              <th className="px-6 py-4 font-bold">Jenis</th>
              <th className="px-6 py-4 font-bold">Produk</th>
              <th className="px-6 py-4 font-bold">Kuantitas</th>
              <th className="px-6 py-4 font-bold">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-[#0d0d0d]/5 hover:bg-[#f5f0e8]/50 transition-colors print:hover:bg-transparent">
                <td className="px-6 py-4">
                  <p className="font-bold text-[#0d0d0d] text-sm">
                    {new Date(t.date || t.createdAt).toLocaleDateString('id-ID', { 
                      day: '2-digit', 
                      month: 'short', 
                      year: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                  <p className="text-xs text-[#6b6456] mt-1">{t.user.name || t.user.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] rounded-sm border ${
                    t.type === 'IN' ? 'bg-green-50 text-green-700 border-green-200' :
                    t.type === 'OUT' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    {t.type === 'IN' && <ArrowDownRight className="w-3 h-3" />}
                    {t.type === 'OUT' && <ArrowUpRight className="w-3 h-3" />}
                    {t.type === 'ADJUSTMENT' && <Scale className="w-3 h-3" />}
                    {t.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-[#0d0d0d] text-sm">{t.product.name}</p>
                  <p className="text-[11px] text-[#6b6456] font-mono mt-1">{t.product.sku}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-bold text-base ${
                    t.type === 'IN' ? 'text-green-600' :
                    t.type === 'OUT' ? 'text-red-500' :
                    'text-slate-600'
                  }`}>
                    {t.type === 'IN' ? '+' : t.type === 'OUT' ? '-' : (t.quantity > 0 ? '+' : '')}{t.quantity}
                  </span>
                  <span className="text-xs text-[#6b6456] ml-1">{t.product.unit}</span>
                </td>
                <td className="px-6 py-4 text-sm text-[#6b6456] max-w-xs break-words" title={t.notes}>
                  {t.type === 'IN' && t.supplier && (
                    <div className="font-medium text-[#0d0d0d] mb-1">Dari: {t.supplier.name}</div>
                  )}
                  {t.notes || '-'}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-[#6b6456] text-sm">
                  Tidak ada transaksi yang cocok dengan filter pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

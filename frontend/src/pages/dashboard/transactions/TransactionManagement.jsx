import React from 'react';
import { ArrowDownRight, ArrowUpRight, Scale, Package } from 'lucide-react';
import useTransactionManagement from './useTransactionManagement';

export default function TransactionManagement() {
  const {
    transactions,
    products,
    suppliers,
    loading,
    error,
    isModalOpen,
    transactionType,
    formData,
    setFormData,
    openModal,
    closeModal,
    handleSubmit
  } = useTransactionManagement();

  if (loading) return <div className="p-8 text-[#6b6456]">Memuat data...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 border border-[#8b6914]/20 bg-[#8b6914]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b6914]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#8b6914]" />
            Pergerakan Barang
          </div>
          <h2 className="text-3xl font-light text-[#0d0d0d]">Transaksi Stok</h2>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => openModal('IN')}
            className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-green-100 transition-colors"
          >
            <ArrowDownRight className="w-4 h-4" /> Stok Masuk
          </button>
          <button
            onClick={() => openModal('OUT')}
            className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-red-100 transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" /> Stok Keluar
          </button>
          <button
            onClick={() => openModal('ADJUSTMENT')}
            className="flex items-center gap-2 bg-[#f5f0e8] text-[#0d0d0d] border border-[#0d0d0d]/20 px-4 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#0d0d0d]/5 transition-colors"
          >
            <Scale className="w-4 h-4" /> Penyesuaian
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#0d0d0d]/10 rounded-sm overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f5f0e8] border-b border-[#0d0d0d]/10 text-[10px] uppercase tracking-[0.2em] text-[#6b6456]">
              <th className="px-6 py-4 font-bold">Tanggal & User</th>
              <th className="px-6 py-4 font-bold">Jenis</th>
              <th className="px-6 py-4 font-bold">Produk</th>
              <th className="px-6 py-4 font-bold">Kuantitas</th>
              <th className="px-6 py-4 font-bold">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-[#0d0d0d]/5 hover:bg-[#f5f0e8]/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-[#0d0d0d] text-sm">{new Date(t.date || t.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
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
                <td className="px-6 py-4 text-sm text-[#6b6456] max-w-xs truncate" title={t.notes}>
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
                  Belum ada riwayat transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0d0d0d]/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-sm border border-[#8b6914]/20 overflow-hidden shadow-2xl">
            <div className="bg-[#f5f0e8] px-6 py-4 border-b border-[#0d0d0d]/10">
              <h3 className="font-bold text-[#0d0d0d] tracking-wide flex items-center gap-2">
                {transactionType === 'IN' && <><ArrowDownRight className="w-5 h-5 text-green-600" /> Catat Stok Masuk</>}
                {transactionType === 'OUT' && <><ArrowUpRight className="w-5 h-5 text-red-500" /> Catat Stok Keluar</>}
                {transactionType === 'ADJUSTMENT' && <><Scale className="w-5 h-5 text-slate-600" /> Penyesuaian Stok</>}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Produk *</label>
                <select
                  required
                  value={formData.productId}
                  onChange={e => setFormData({...formData, productId: e.target.value})}
                  className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none bg-white"
                >
                  <option value="" disabled>Pilih Produk</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Stok: {p.stock} {p.unit})</option>
                  ))}
                </select>
              </div>

              {transactionType === 'IN' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Supplier Asal *</label>
                  <select
                    required
                    value={formData.supplierId}
                    onChange={e => setFormData({...formData, supplierId: e.target.value})}
                    className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none bg-white"
                  >
                    <option value="" disabled>Pilih Supplier</option>
                    {suppliers.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Tanggal Transaksi *</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">
                  {transactionType === 'ADJUSTMENT' ? 'Jumlah (Gunakan - untuk kurangi) *' : 'Jumlah *'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={transactionType !== 'ADJUSTMENT' ? "1" : undefined}
                    value={formData.quantity}
                    onChange={e => setFormData({...formData, quantity: e.target.value})}
                    className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 pl-10 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
                    placeholder="Contoh: 10"
                  />
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d0d0d]/30" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Catatan / Keterangan</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none resize-none"
                  placeholder={
                    transactionType === 'IN' ? 'Faktur Pembelian No...' : 
                    transactionType === 'OUT' ? 'Terjual ke...' : 
                    'Barang rusak / sobek...'
                  }
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-[#0d0d0d]/20 text-[#0d0d0d] text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#f5f0e8] transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-3 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm transition-colors ${
                    transactionType === 'IN' ? 'bg-green-600 hover:bg-green-700' :
                    transactionType === 'OUT' ? 'bg-red-600 hover:bg-red-700' :
                    'bg-[#0d0d0d] hover:bg-[#8b6914]'
                  }`}
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

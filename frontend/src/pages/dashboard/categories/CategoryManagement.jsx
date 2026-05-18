import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import useCategoryManagement from './useCategoryManagement';

export default function CategoryManagement() {
  const {
    categories,
    loading,
    error,
    isModalOpen,
    editingCategory,
    formData,
    setFormData,
    openModal,
    closeModal,
    handleSubmit,
    handleDelete
  } = useCategoryManagement();

  if (loading) return <div className="p-8 text-[#6b6456]">Memuat data...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 border border-[#8b6914]/20 bg-[#8b6914]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b6914]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#8b6914]" />
            Manajemen Produk
          </div>
          <h2 className="text-3xl font-light text-[#0d0d0d]">Kategori Material</h2>
        </div>
        
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#0d0d0d] text-white px-5 py-3 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Kategori
        </button>
      </div>

      <div className="bg-white border border-[#0d0d0d]/10 rounded-sm overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f5f0e8] border-b border-[#0d0d0d]/10 text-[10px] uppercase tracking-[0.2em] text-[#6b6456]">
              <th className="px-6 py-4 font-bold">Nama Kategori</th>
              <th className="px-6 py-4 font-bold">Keterangan</th>
              <th className="px-6 py-4 font-bold text-center">Jumlah Produk</th>
              <th className="px-6 py-4 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-[#0d0d0d]/5 hover:bg-[#f5f0e8]/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-[#0d0d0d] text-sm">{c.name}</p>
                </td>
                <td className="px-6 py-4 text-sm text-[#6b6456]">
                  {c.description || '-'}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center min-w-8 h-8 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                    {c._count?.products || 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openModal(c)}
                    className="p-2 text-[#6b6456] hover:text-[#8b6914] transition-colors inline-block"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-2 ml-2 transition-colors inline-block text-[#6b6456] hover:text-red-500"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-[#6b6456] text-sm">
                  Belum ada data kategori.
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
              <h3 className="font-bold text-[#0d0d0d] tracking-wide">
                {editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Nama Kategori *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
                  placeholder="Besi / Semen / Cat"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Keterangan Tambahan</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none resize-none"
                  placeholder="Keterangan kategori (opsional)"
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
                  className="flex-1 px-4 py-3 bg-[#0d0d0d] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#8b6914] transition-colors"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

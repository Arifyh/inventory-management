import React from 'react';
import { Plus, Edit2, Trash2, Search, Truck } from 'lucide-react';
import useSupplierManagement from './useSupplierManagement';

export default function SupplierManagement() {
  const {
    suppliers,
    loading,
    error,
    search,
    setSearch,
    isModalOpen,
    editingSupplier,
    formData,
    setFormData,
    openModal,
    closeModal,
    handleSubmit,
    handleDelete
  } = useSupplierManagement();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 border border-[#8b6914]/20 bg-[#8b6914]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b6914]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#8b6914]" />
            Sumber Barang
          </div>
          <h2 className="text-3xl font-light text-[#0d0d0d]">Manajemen Supplier</h2>
        </div>
        
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#0d0d0d] text-white px-5 py-3 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Supplier
        </button>
      </div>

      <div className="bg-white border border-[#0d0d0d]/10 rounded-sm overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#0d0d0d]/10 flex justify-between items-center">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Cari nama supplier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-[#0d0d0d]/10 rounded-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0d0d0d]/30" />
          </div>
        </div>

        {loading && <div className="p-8 text-center text-[#6b6456] text-sm">Memuat data...</div>}
        {error && <div className="p-8 text-center text-red-500 text-sm">{error}</div>}

        {!loading && !error && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f0e8] border-b border-[#0d0d0d]/10 text-[10px] uppercase tracking-[0.2em] text-[#6b6456]">
                <th className="px-6 py-4 font-bold">Informasi Supplier</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.id} className="border-b border-[#0d0d0d]/5 hover:bg-[#f5f0e8]/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#8b6914]/10 text-[#8b6914] flex items-center justify-center mt-1 border border-[#8b6914]/20">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0d0d0d] text-base">{s.name}</h4>
                        <div className="mt-2 space-y-1 text-sm text-[#6b6456]">
                          <p><span className="font-semibold text-[#0d0d0d]">Telp:</span> {s.phone}</p>
                          <p><span className="font-semibold text-[#0d0d0d]">Alamat:</span> {s.address}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right align-top">
                    <button
                      onClick={() => openModal(s)}
                      className="p-2 text-[#6b6456] hover:text-[#8b6914] transition-colors inline-block"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-2 ml-2 transition-colors inline-block text-[#6b6456] hover:text-red-500"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan="2" className="px-6 py-12 text-center text-[#6b6456] text-sm">
                    {search ? 'Tidak ada supplier yang sesuai dengan pencarian.' : 'Belum ada data supplier.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0d0d0d]/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-sm border border-[#8b6914]/20 overflow-hidden shadow-2xl">
            <div className="bg-[#f5f0e8] px-6 py-4 border-b border-[#0d0d0d]/10">
              <h3 className="font-bold text-[#0d0d0d] tracking-wide">
                {editingSupplier ? 'Edit Supplier' : 'Tambah Supplier Baru'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Nama Supplier *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
                  placeholder="PT. Bangun Perkasa"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Nomor Telepon *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
                  placeholder="08123456789"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Alamat Lengkap *</label>
                <textarea
                  required
                  rows="3"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none resize-none"
                  placeholder="Jl. Raya Bangunan No. 123"
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

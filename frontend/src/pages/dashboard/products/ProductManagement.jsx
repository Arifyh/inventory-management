import React, { useRef } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, CheckCircle2, XCircle, Star, Upload, X } from 'lucide-react';
import useProductManagement from './useProductManagement';

export default function ProductManagement() {
  const {
    products,
    categories,
    loading,
    error,
    isModalOpen,
    editingProduct,
    formData,
    setFormData,
    openModal,
    closeModal,
    handleSubmit,
    handleDelete,
    handleTogglePublish,
    isImageModalOpen,
    currentProductForImages,
    openImageModal,
    closeImageModal,
    handleUploadImages,
    handleDeleteImage,
    handleSetThumbnail
  } = useProductManagement();

  const fileInputRef = useRef(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 border border-[#8b6914]/20 bg-[#8b6914]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b6914]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#8b6914]" />
            Katalog
          </div>
          <h2 className="text-3xl font-light text-[#0d0d0d]">Manajemen Produk</h2>
        </div>
        
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#0d0d0d] text-white px-5 py-3 rounded-sm text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Produk
        </button>
      </div>

      {loading && <div className="p-8 text-[#6b6456]">Memuat data...</div>}
      {error && <div className="p-8 text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="bg-white border border-[#0d0d0d]/10 rounded-sm overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f0e8] border-b border-[#0d0d0d]/10 text-[10px] uppercase tracking-[0.2em] text-[#6b6456]">
                <th className="px-6 py-4 font-bold">Produk & SKU</th>
                <th className="px-6 py-4 font-bold">Kategori</th>
                <th className="px-6 py-4 font-bold">Stok</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const thumbnail = p.images?.find(img => img.isThumbnail) || p.images?.[0];
                return (
                  <tr key={p.id} className="border-b border-[#0d0d0d]/5 hover:bg-[#f5f0e8]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-sm border border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                          {thumbnail ? (
                            <img src={`http://localhost:5000${thumbnail.url}`} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-[#0d0d0d] text-sm">{p.name}</p>
                          <p className="text-[11px] text-[#6b6456] mt-1 font-mono">{p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6b6456]">
                      {p.category?.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#0d0d0d]">{p.stock} {p.unit}</span>
                        {p.stock <= p.minStock && (
                          <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider mt-1">Stok Menipis</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleTogglePublish(p.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] rounded-sm border transition-colors ${
                          p.isPublished 
                            ? 'bg-green-50 border-green-200 text-green-700 hover:bg-red-50 hover:text-red-700 hover:border-red-200' 
                            : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-green-50 hover:text-green-700 hover:border-green-200'
                        }`}
                        title={p.isPublished ? "Klik untuk Unpublish" : "Klik untuk Publish"}
                      >
                        {p.isPublished ? (
                          <><CheckCircle2 className="w-3 h-3" /> Publik</>
                        ) : (
                          <><XCircle className="w-3 h-3" /> Draft</>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openImageModal(p)}
                        className="p-2 text-[#6b6456] hover:text-[#8b6914] transition-colors inline-block relative"
                        title="Kelola Foto"
                      >
                        <ImageIcon className="w-4 h-4" />
                        {p.images?.length > 0 && (
                          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#8b6914] rounded-full border border-white"></span>
                        )}
                      </button>
                      <button
                        onClick={() => openModal(p)}
                        className="p-2 text-[#6b6456] hover:text-[#8b6914] transition-colors inline-block"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 transition-colors inline-block text-[#6b6456] hover:text-red-500"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-[#6b6456] text-sm">
                    Belum ada data produk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0d0d0d]/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-sm border border-[#8b6914]/20 overflow-hidden shadow-2xl">
            <div className="bg-[#f5f0e8] px-6 py-4 border-b border-[#0d0d0d]/10 flex justify-between items-center">
              <h3 className="font-bold text-[#0d0d0d] tracking-wide">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h3>
              <button onClick={closeModal} className="text-[#6b6456] hover:text-[#0d0d0d]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
                  placeholder="Semen Tiga Roda 50kg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Kategori *</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={e => setFormData({...formData, categoryId: e.target.value})}
                    className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none bg-white"
                  >
                    <option value="" disabled>Pilih Kategori</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Satuan</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={e => setFormData({...formData, unit: e.target.value})}
                    className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
                    placeholder="Pcs, Sak, Kg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Harga (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Batas Stok Minimum</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minStock}
                    onChange={e => setFormData({...formData, minStock: e.target.value})}
                    className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">Deskripsi Produk</label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-[#0d0d0d]/10 rounded-sm px-4 py-3 text-sm focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] outline-none resize-none"
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

      {/* Image Upload Modal */}
      {isImageModalOpen && currentProductForImages && (
        <div className="fixed inset-0 bg-[#0d0d0d]/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-sm border border-[#8b6914]/20 overflow-hidden shadow-2xl">
            <div className="bg-[#f5f0e8] px-6 py-4 border-b border-[#0d0d0d]/10 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-[#0d0d0d] tracking-wide">Kelola Foto: {currentProductForImages.name}</h3>
                <p className="text-xs text-[#6b6456] mt-1">{currentProductForImages.sku}</p>
              </div>
              <button onClick={closeImageModal} className="text-[#6b6456] hover:text-[#0d0d0d]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Upload Area */}
              <div 
                className="border-2 border-dashed border-[#0d0d0d]/20 rounded-sm p-8 text-center hover:bg-[#f5f0e8]/50 transition-colors cursor-pointer mb-6"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 mx-auto text-[#8b6914] mb-3" />
                <p className="text-sm font-medium text-[#0d0d0d]">Klik untuk mengunggah foto</p>
                <p className="text-xs text-[#6b6456] mt-1">Maks 2MB per file (JPG, PNG)</p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  multiple 
                  accept="image/jpeg,image/png"
                  onChange={(e) => handleUploadImages(currentProductForImages.id, e.target.files)}
                />
              </div>

              {/* Image Grid */}
              {currentProductForImages.images && currentProductForImages.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {currentProductForImages.images.map((img) => (
                    <div key={img.id} className="group relative aspect-square bg-gray-100 rounded-sm border border-gray-200 overflow-hidden">
                      <img src={`http://localhost:5000${img.url}`} alt="Product" className="w-full h-full object-cover" />
                      
                      <div className="absolute inset-0 bg-[#0d0d0d]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        {!img.isThumbnail && (
                          <button 
                            onClick={() => handleSetThumbnail(currentProductForImages.id, img.id)}
                            className="bg-white text-[#0d0d0d] px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-[#8b6914] hover:text-white transition-colors"
                          >
                            Set Thumbnail
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteImage(currentProductForImages.id, img.id)}
                          className="bg-red-500 text-white px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
                        >
                          Hapus Foto
                        </button>
                      </div>

                      {img.isThumbnail && (
                        <div className="absolute top-2 left-2 bg-[#8b6914] text-white px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 fill-white" /> Utama
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#6b6456] text-sm">
                  Belum ada foto untuk produk ini.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

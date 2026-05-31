import React from "react";
import useCatalogScreen from "./useCatalogScreen";
import {
  Search,
  Tag,
  Phone,
  Lock,
  User,
  X,
  ImageOff,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function Catalog() {
  const {
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredProducts,
    selectedProduct,
    activeImageIndex,
    setActiveImageIndex,
    openProductDetail,
    closeProductDetail,
    handleWhatsAppRedirect,
    handleLoginRedirect,
    currentUser,
    handleDashboardRedirect,
  } = useCatalogScreen();

  const getProductThumbnail = (product) => {
    if (!product.images || product.images.length === 0) return null;
    const thumb = product.images.find((img) => img.isThumbnail);
    return thumb
      ? `http://localhost:5000${thumb.url}`
      : `http://localhost:5000${product.images[0].url}`;
  };

  const formatPrice = (price) => {
    return parseFloat(price || 0).toLocaleString("id-ID");
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#0d0d0d] font-sans antialiased pb-20">
      {/* Top Header / Navigation */}
      <header className="bg-white border-b border-[#0d0d0d]/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-[#0d0d0d] text-white flex items-center justify-center font-bold tracking-wider text-sm rounded-sm">
              IK
            </div>
            <div>
              <h1 className="text-lg font-bold uppercase tracking-[0.1em] text-[#0d0d0d]">
                Ikonik
              </h1>
              <p className="text-[10px] text-[#8b6914] font-bold uppercase tracking-widest mt-0.5">
                Katalog Publik
              </p>
            </div>
          </div>

          {currentUser ? (
            <button
              onClick={handleDashboardRedirect}
              className="group flex items-center gap-2 border border-[#8b6914] bg-[#8b6914]/5 hover:bg-[#8b6914] hover:text-white px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer text-[#8b6914]"
            >
              <User className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Dashboard Saya ({currentUser.name || 'User'})
            </button>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="group flex items-center gap-2 border border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Masuk / Daftar
            </button>
          )}
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="bg-white border-b border-[#0d0d0d]/5 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 border border-[#8b6914]/20 bg-[#8b6914]/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8b6914] mb-4">
            Premium Building Materials
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#0d0d0d]">
            Temukan Material Terbaik untuk{" "}
            <span className="font-semibold text-[#8b6914]">Proyek Anda</span>
          </h2>
          <p className="text-sm text-[#6b6456] max-w-xl mx-auto mt-3 leading-relaxed">
            Jelajahi koleksi material berkualitas tinggi mulai dari batu alam,
            kayu premium, logam, semen, hingga keramik dengan harga transparan.
          </p>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white border border-[#0d0d0d]/10 p-5 md:p-6 rounded-sm shadow-sm space-y-5">
          {/* Row 1: Search & Total Result Count */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b6456]/60">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama material atau SKU..."
                className="w-full bg-[#f5f0e8]/30 border border-[#0d0d0d]/10 focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] rounded-sm pl-10 pr-4 py-2.5 text-xs text-[#0d0d0d] font-medium placeholder-[#6b6456]/50 outline-none transition-colors"
              />
            </div>

            {/* Result count */}
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#6b6456]">
              Menampilkan {filteredProducts.length} Produk
            </div>
          </div>

          {/* Row 2: Category Filter Buttons */}
          <div className="pt-2 border-t border-[#0d0d0d]/5">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#8b6914]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6456]">
                Filter Kategori
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* ALL button */}
              <button
                onClick={() => setSelectedCategoryId("ALL")}
                className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer ${selectedCategoryId === "ALL"
                    ? "bg-[#0d0d0d] text-white border-[#0d0d0d]"
                    : "bg-transparent text-[#6b6456] border-[#0d0d0d]/10 hover:border-[#8b6914]/40 hover:text-[#0d0d0d]"
                  }`}
              >
                Semua Material
              </button>

              {/* Dynamic categories */}
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id.toString())}
                  className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer ${selectedCategoryId === cat.id.toString()
                      ? "bg-[#8b6914] text-white border-[#8b6914]"
                      : "bg-transparent text-[#6b6456] border-[#0d0d0d]/10 hover:border-[#8b6914]/40 hover:text-[#0d0d0d]"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        {loading ? (
          <div className="text-center py-20 bg-white border border-[#0d0d0d]/10 rounded-sm">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#8b6914] mb-3"></div>
            <p className="text-[#6b6456] text-xs font-bold uppercase tracking-[0.15em]">
              Memuat Katalog Produk...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white border border-red-200 text-red-700 rounded-sm px-4">
            <p className="text-sm font-semibold mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 inline-flex items-center gap-1.5 bg-[#0d0d0d] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#0d0d0d]/10 rounded-sm">
            <Tag className="w-8 h-8 text-[#6b6456]/40 mx-auto mb-3" />
            <p className="text-[#0d0d0d] font-bold uppercase tracking-[0.15em] text-xs">
              Produk Tidak Ditemukan
            </p>
            <p className="text-[#6b6456] text-xs mt-1">
              Coba gunakan kata kunci pencarian lain atau pilih kategori yang
              berbeda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const imgUrl = getProductThumbnail(product);
              const isAvailable = product.stock > 0;

              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#0d0d0d]/10 rounded-sm hover:border-[#8b6914] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  {/* Thumbnail Wrapper */}
                  <div
                    onClick={() => openProductDetail(product)}
                    className="aspect-square bg-[#f5f0e8]/50 border-b border-[#0d0d0d]/5 relative overflow-hidden cursor-pointer"
                  >
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#6b6456]/40">
                        <ImageOff className="w-8 h-8 stroke-1 mb-1" />
                        <span className="text-[9px] uppercase font-bold tracking-widest">
                          No Thumbnail
                        </span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider rounded-sm shadow-sm ${isAvailable
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-600" : "bg-red-600"}`}
                        />
                        {isAvailable ? "Tersedia" : "Habis"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-bold font-mono tracking-wider text-[#6b6456]">
                          {product.sku}
                        </span>
                        <span className="bg-[#f5f0e8] text-[#8b6914] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded-sm">
                          {product.category?.name}
                        </span>
                      </div>

                      <h3
                        onClick={() => openProductDetail(product)}
                        className="text-sm font-bold text-[#0d0d0d] hover:text-[#8b6914] cursor-pointer line-clamp-1 leading-snug transition-colors"
                      >
                        {product.name}
                      </h3>

                      <p className="text-[#6b6456] text-[11px] line-clamp-2 leading-relaxed h-[34px]">
                        {product.description || "Tidak ada deskripsi produk."}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#0d0d0d]/5 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[9px] uppercase tracking-wider text-[#6b6456] font-bold">
                          Harga
                        </span>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-[#6b6456] mr-0.5">
                            Rp
                          </span>
                          <span className="text-sm font-bold text-[#0d0d0d]">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-[10px] text-[#6b6456] ml-0.5">
                            /{product.unit}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openProductDetail(product)}
                          className="w-full text-center border border-[#0d0d0d]/20 hover:border-[#0d0d0d] text-[#0d0d0d] py-2 rounded-sm text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleWhatsAppRedirect(product)}
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-[#16a34a] hover:bg-[#15803d] text-white py-2 rounded-sm text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          <Phone className="w-3 h-3 fill-white" />
                          Tanya WA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0d0d]/60 backdrop-blur-xs transition-opacity duration-300">
          <div
            className="bg-white border border-[#0d0d0d]/20 w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeProductDetail}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-[#0d0d0d] hover:text-red-600 border border-[#0d0d0d]/10 h-8 w-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Image Gallery */}
            <div className="w-full md:w-1/2 bg-[#f5f0e8]/30 flex flex-col border-r border-[#0d0d0d]/5">
              <div className="flex-1 aspect-square md:aspect-auto md:h-[450px] relative overflow-hidden flex items-center justify-center bg-[#f5f0e8]/50">
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <img
                    src={`http://localhost:5000${selectedProduct.images[activeImageIndex].url}`}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#6b6456]/40">
                    <ImageOff className="w-12 h-12 stroke-1 mb-2" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">
                      No Image Available
                    </span>
                  </div>
                )}

                {/* Available Badge inside modal */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-[8px] font-bold uppercase tracking-wider rounded-sm shadow-sm ${selectedProduct.stock > 0
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${selectedProduct.stock > 0 ? "bg-emerald-600" : "bg-red-600"}`}
                    />
                    {selectedProduct.stock > 0 ? "Tersedia" : "Habis"}
                  </span>
                </div>
              </div>

              {/* Thumbnails row */}
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="p-4 border-t border-[#0d0d0d]/5 flex gap-2 overflow-x-auto bg-white">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-14 w-14 border rounded-sm overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-200 ${activeImageIndex === idx
                          ? "border-[#8b6914] ring-1 ring-[#8b6914]"
                          : "border-[#0d0d0d]/10 hover:border-[#8b6914]/50"
                        }`}
                    >
                      <img
                        src={`http://localhost:5000${img.url}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details info */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between max-h-[550px] md:max-h-none overflow-y-auto">
              <div>
                {/* Meta details */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold font-mono tracking-widest text-[#6b6456]">
                    SKU: {selectedProduct.sku}
                  </span>
                  <span className="h-3 w-px bg-[#0d0d0d]/10" />
                  <span className="bg-[#f5f0e8] text-[#8b6914] px-2.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                    {selectedProduct.category?.name}
                  </span>
                </div>

                {/* Name */}
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#0d0d0d] mb-4">
                  {selectedProduct.name}
                </h2>

                {/* Price block */}
                <div className="bg-[#f5f0e8]/40 border border-[#0d0d0d]/5 p-4 rounded-sm mb-6 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#6b6456]">
                      Estimasi Harga Jual
                    </p>
                    <p className="text-2xl font-bold text-[#0d0d0d] mt-1">
                      <span className="text-sm font-semibold text-[#6b6456] mr-1">
                        Rp
                      </span>
                      {formatPrice(selectedProduct.price)}
                      <span className="text-xs font-normal text-[#6b6456] ml-1">
                        / {selectedProduct.unit}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#6b6456]">
                      Stok Gudang
                    </p>
                    <p className="text-sm font-bold text-[#0d0d0d] mt-1 font-mono">
                      {selectedProduct.stock} {selectedProduct.unit}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6 space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0d0d0d]">
                    Deskripsi Produk
                  </h4>
                  <p className="text-xs text-[#6b6456] leading-relaxed whitespace-pre-wrap">
                    {selectedProduct.description ||
                      "Tidak ada deskripsi yang ditambahkan untuk produk ini."}
                  </p>
                </div>
              </div>

              {/* Bottom Actions inside modal */}
              <div className="pt-6 border-t border-[#0d0d0d]/5 flex gap-3">
                <button
                  onClick={closeProductDetail}
                  className="flex-1 border border-[#0d0d0d]/20 hover:border-[#0d0d0d] text-[#0d0d0d] py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer"
                >
                  Tutup Katalog
                </button>
                <button
                  onClick={() => handleWhatsAppRedirect(selectedProduct)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  Hubungi WA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

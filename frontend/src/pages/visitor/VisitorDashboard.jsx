import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, ShoppingBag, CreditCard, ArrowLeft, Home, Package, CheckCircle, Clock, X, Upload } from "lucide-react";
import axios from "axios";

export default function VisitorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  
  // Payment Modal State
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);
  const [paymentFile, setPaymentFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleOpenPaymentModal = (order) => {
    setSelectedOrderForPayment(order);
    setPaymentFile(null);
  };

  const handleClosePaymentModal = () => {
    setSelectedOrderForPayment(null);
    setPaymentFile(null);
  };

  const handlePayOrder = async (e) => {
    e.preventDefault();
    if (!selectedOrderForPayment || !paymentFile) {
      alert("Harap unggah bukti transfer.");
      return;
    }
    
    try {
      setPayLoading(true);
      
      const formData = new FormData();
      formData.append("paymentProof", paymentFile);

      await axios.put(`http://localhost:5000/api/orders/${selectedOrderForPayment.id}/pay`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      // Refresh orders after payment
      fetchOrders();
      handleClosePaymentModal();
      alert("Bukti pembayaran berhasil diunggah! Status pesanan Anda sekarang PAID.");
    } catch (err) {
      console.error("Failed to pay order:", err);
      alert("Terjadi kesalahan saat memproses pembayaran.");
    } finally {
      setPayLoading(false);
    }
  };

  const formatPrice = (price) => parseFloat(price).toLocaleString("id-ID");

  const pendingCount = orders.filter(o => o.status === "PENDING").length;
  const activeCount = orders.filter(o => ["PAID", "PROCESSING", "SHIPPED"].includes(o.status)).length;
  const totalSpent = orders.filter(o => o.status !== "PENDING" && o.status !== "CANCELLED").reduce((acc, o) => acc + parseFloat(o.totalAmount), 0);

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
            <Link to="/" className="text-xs font-bold uppercase tracking-wider text-[#6b6456] hover:text-[#0d0d0d] flex items-center gap-1.5">
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
              <div className="flex items-center gap-2.5 px-4 py-3 text-xs text-[#0d0d0d] bg-[#f5f0e8]/40 font-medium">
                <Package className="w-4 h-4 text-[#8b6914]" />
                Pesanan Saya
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dashboard Welcome & Stats */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-[#0d0d0d]/10 p-8 rounded-sm shadow-sm relative overflow-hidden">
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
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b6456]">Pesanan Aktif</p>
                <h4 className="text-xl font-bold text-[#0d0d0d] mt-1 font-mono">{activeCount}</h4>
              </div>
            </div>

            <div className="bg-white border border-[#0d0d0d]/10 p-5 rounded-sm shadow-sm flex items-center gap-4">
              <div className="p-3 bg-[#f5f0e8] text-[#8b6914] rounded-sm">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b6456]">Menunggu Pembayaran</p>
                <h4 className="text-xl font-bold text-[#0d0d0d] mt-1 font-mono">{pendingCount}</h4>
              </div>
            </div>

            <div className="bg-white border border-[#0d0d0d]/10 p-5 rounded-sm shadow-sm flex items-center gap-4">
              <div className="p-3 bg-[#f5f0e8] text-[#8b6914] rounded-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6b6456]">Total Transaksi</p>
                <h4 className="text-xl font-bold text-[#0d0d0d] mt-1 font-mono">Rp {formatPrice(totalSpent)}</h4>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white border border-[#0d0d0d]/10 rounded-sm shadow-sm">
            <div className="px-6 py-4 border-b border-[#0d0d0d]/10">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0d0d0d]">Riwayat Pesanan</h4>
            </div>
            
            {loading ? (
              <div className="p-8 text-center text-xs text-[#6b6456]">Memuat pesanan...</div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center">
                <Package className="w-8 h-8 text-[#6b6456]/30 mx-auto mb-3" />
                <p className="text-xs text-[#6b6456]">Belum ada pesanan.</p>
              </div>
            ) : (
              <div className="divide-y divide-[#0d0d0d]/5">
                {orders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#6b6456] mb-1 block">#{order.orderNumber}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider ${
                          order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                          order.status === 'PAID' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-[#6b6456] block mb-1">Total Belanja</span>
                        <span className="text-sm font-bold text-[#8b6914]">Rp {formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-3 text-xs">
                          <div className="w-10 h-10 bg-[#f5f0e8] rounded-sm flex-shrink-0 overflow-hidden">
                            {item.product.images && item.product.images.length > 0 ? (
                              <img src={`http://localhost:5000${item.product.images[0].url}`} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-[#f5f0e8]"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-[#0d0d0d]">{item.product.name}</p>
                            <p className="text-[#6b6456]">{item.quantity} x Rp {formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.status === 'PENDING' && (
                      <div className="mt-5 pt-4 border-t border-[#0d0d0d]/5 flex justify-end">
                        <button
                          onClick={() => handleOpenPaymentModal(order)}
                          className="bg-[#0d0d0d] text-white px-5 py-2 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          Bayar Sekarang
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {selectedOrderForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d0d0d]/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="bg-white border border-[#0d0d0d]/20 w-full max-w-md rounded-sm shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#0d0d0d]/10 flex justify-between items-center bg-[#f5f0e8]/30">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0d0d0d]">Konfirmasi Pembayaran</h3>
              <button onClick={handleClosePaymentModal} className="text-[#6b6456] hover:text-red-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handlePayOrder} className="p-6 space-y-6">
              {/* Payment Info Box */}
              <div className="bg-[#8b6914]/5 border border-[#8b6914]/20 p-4 rounded-sm">
                <p className="text-xs text-[#6b6456] mb-2 font-medium">Silakan lakukan transfer ke rekening berikut:</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white text-[10px] font-bold italic">BCA</div>
                  <div>
                    <p className="text-lg font-mono font-bold text-[#0d0d0d] tracking-wider">123 456 789</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6914]">A/N IKONIK</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#6b6456] mb-1">Total Tagihan Pesanan <span className="font-mono text-[#0d0d0d]">#{selectedOrderForPayment.orderNumber}</span></p>
                <p className="text-2xl font-bold text-[#0d0d0d]">Rp {formatPrice(selectedOrderForPayment.totalAmount)}</p>
              </div>

              {/* Upload Proof */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0d0d0d] mb-2">Unggah Bukti Transfer</label>
                <div 
                  className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-colors ${paymentFile ? 'border-[#8b6914] bg-[#8b6914]/5' : 'border-[#0d0d0d]/20 hover:border-[#8b6914]/50 hover:bg-[#f5f0e8]/30'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {paymentFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle className="w-8 h-8 text-[#8b6914]" />
                      <span className="text-xs font-medium text-[#0d0d0d] line-clamp-1 px-4">{paymentFile.name}</span>
                      <span className="text-[10px] text-[#6b6456]">Klik untuk mengganti file</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-[#6b6456]/50" />
                      <span className="text-xs font-medium text-[#0d0d0d]">Klik untuk memilih file foto/screenshot</span>
                      <span className="text-[10px] text-[#6b6456]">Format JPG/PNG (Max 2MB)</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/jpeg, image/png"
                    onChange={(e) => {
                      if(e.target.files && e.target.files[0]) {
                        setPaymentFile(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={payLoading || !paymentFile}
                className="w-full flex items-center justify-center gap-2 bg-[#0d0d0d] text-white py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors disabled:opacity-50 cursor-pointer mt-4"
              >
                {payLoading ? "Memproses..." : "Konfirmasi Pembayaran"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

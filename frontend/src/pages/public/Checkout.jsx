import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ArrowLeft, MapPin, CheckCircle } from "lucide-react";
import axios from "axios";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [shippingAddress, setShippingAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatPrice = (price) => parseFloat(price).toLocaleString("id-ID");

  if (!currentUser || cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const items = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }));

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items,
          totalAmount: cartTotal,
          shippingAddress,
          notes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      clearCart();
      navigate("/visitor/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.response?.data?.message || "Terjadi kesalahan saat memproses pesanan.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#0d0d0d] font-sans antialiased pb-20">
      <header className="bg-white border-b border-[#0d0d0d]/10 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/cart" className="p-2 text-[#6b6456] hover:text-[#0d0d0d] transition-colors rounded-full hover:bg-[#f5f0e8]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#0d0d0d]">
            Checkout
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 text-xs rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleCreateOrder} className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#8b6914]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0d0d0d]">Alamat Pengiriman</h2>
            </div>
            <textarea
              required
              rows="3"
              placeholder="Masukkan alamat lengkap pengiriman..."
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full bg-[#f5f0e8]/30 border border-[#0d0d0d]/10 focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] rounded-sm p-3 text-xs text-[#0d0d0d] outline-none transition-colors resize-none"
            ></textarea>
          </div>

          {/* Notes */}
          <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0d0d0d] mb-4">Catatan Pesanan (Opsional)</h2>
            <input
              type="text"
              placeholder="Catatan untuk penjual atau kurir..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#f5f0e8]/30 border border-[#0d0d0d]/10 focus:border-[#8b6914] focus:ring-1 focus:ring-[#8b6914] rounded-sm p-3 text-xs text-[#0d0d0d] outline-none transition-colors"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0d0d0d] mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0d0d0d] w-6">{item.quantity}x</span>
                    <span className="text-[#6b6456] line-clamp-1">{item.product.name}</span>
                  </div>
                  <span className="font-mono text-[#0d0d0d]">Rp {formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-[#0d0d0d]/10 pt-4 flex justify-between items-center">
              <span className="text-sm font-bold uppercase tracking-wider text-[#0d0d0d]">Total Tagihan</span>
              <span className="text-xl font-bold text-[#8b6914]">Rp {formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#0d0d0d] text-white py-4 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Memproses..." : (
              <>
                <CheckCircle className="w-4 h-4" /> Buat Pesanan
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}

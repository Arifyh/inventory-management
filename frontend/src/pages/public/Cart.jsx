import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const formatPrice = (price) => parseFloat(price).toLocaleString("id-ID");

  const handleCheckout = () => {
    if (!currentUser) {
      alert("Silakan login terlebih dahulu untuk checkout.");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#0d0d0d] font-sans antialiased pb-20">
      {/* Header */}
      <header className="bg-white border-b border-[#0d0d0d]/10 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#6b6456] hover:text-[#0d0d0d] text-xs font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" />
            Lanjut Belanja
          </Link>
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#0d0d0d]">
            Keranjang Belanja
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {cartItems.length === 0 ? (
          <div className="bg-white border border-[#0d0d0d]/10 p-12 rounded-sm text-center shadow-sm">
            <ShoppingBag className="w-12 h-12 mx-auto text-[#6b6456]/30 mb-4" />
            <h2 className="text-xl font-bold text-[#0d0d0d] mb-2">Keranjang Kosong</h2>
            <p className="text-sm text-[#6b6456] mb-6">Anda belum menambahkan material apapun ke keranjang.</p>
            <Link to="/" className="inline-flex items-center justify-center bg-[#0d0d0d] text-white px-6 py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors">
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="bg-white border border-[#0d0d0d]/10 p-4 rounded-sm flex gap-4 items-center">
                  <div className="w-20 h-20 bg-[#f5f0e8] rounded-sm flex-shrink-0 overflow-hidden">
                    {item.product.images && item.product.images.length > 0 ? (
                      <img
                        src={`http://localhost:5000${item.product.images[0].url}`}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#6b6456]/40 text-[10px]">
                        No Img
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-[#0d0d0d] line-clamp-1">{item.product.name}</h3>
                    <p className="text-[10px] text-[#6b6456] font-mono tracking-wider mt-1">{item.product.sku}</p>
                    <p className="text-xs font-bold text-[#8b6914] mt-2">Rp {formatPrice(item.product.price)} <span className="text-[10px] font-normal text-[#6b6456]">/{item.product.unit}</span></p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#0d0d0d]/20 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-[#f5f0e8] text-[#0d0d0d]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold font-mono">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="p-1.5 hover:bg-[#f5f0e8] text-[#0d0d0d] disabled:opacity-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm sticky top-24 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0d0d0d] border-b border-[#0d0d0d]/10 pb-4 mb-4">
                  Ringkasan Belanja
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs text-[#6b6456]">
                    <span>Total Harga ({cartItems.length} barang)</span>
                    <span className="font-bold text-[#0d0d0d]">Rp {formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="border-t border-[#0d0d0d]/10 pt-4 mb-6 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0d0d0d]">Total</span>
                  <span className="text-lg font-bold text-[#8b6914]">Rp {formatPrice(cartTotal)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#0d0d0d] text-white py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors cursor-pointer"
                >
                  Beli ({cartItems.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

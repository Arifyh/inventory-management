import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import VisitorDashboard from "./pages/visitor/VisitorDashboard";
import Catalog from "./pages/public/Catalog";
import Cart from "./pages/public/Cart";
import Checkout from "./pages/public/Checkout";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/visitor/dashboard" element={<VisitorDashboard />} />
      </Routes>
    </CartProvider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import VisitorDashboard from "./pages/visitor/VisitorDashboard";
import Catalog from "./pages/public/Catalog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/visitor/dashboard" element={<VisitorDashboard />} />
    </Routes>
  );
}

export default App;

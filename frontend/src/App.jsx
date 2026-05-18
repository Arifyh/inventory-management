import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Catalog from "./pages/public/Catalog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

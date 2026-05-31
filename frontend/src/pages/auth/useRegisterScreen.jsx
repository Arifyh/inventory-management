import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useRegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    let valid = true;

    if (!name.trim()) {
      newErrors.name = "Nama lengkap tidak boleh kosong.";
      valid = false;
    }

    if (!validateEmail(email)) {
      newErrors.email = "Masukkan alamat email yang valid.";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password minimal harus 6 karakter.";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login", { state: { registered: true } });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general:
          error.response?.data?.message ||
          "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    loading,
    errors,
    handleSubmit,
  };
}

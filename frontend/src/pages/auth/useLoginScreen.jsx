import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function useLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };

    let valid = true;

    if (!validateEmail(email)) {
      newErrors.email = "Masukkan alamat email yang valid.";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password tidak boleh kosong.";
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
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general:
          error.response?.data?.message || 'Terjadi kesalahan pada server. Silakan coba lagi.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    remember,
    setRemember,
    showPassword,
    setShowPassword,
    loading,
    errors,
    handleSubmit,
  };
}

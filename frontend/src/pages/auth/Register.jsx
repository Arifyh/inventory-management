import React from "react";
import { Eye, EyeOff, Mail, User, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import useRegisterScreen from "./useRegisterScreen";

export default function Register() {
  const {
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
  } = useRegisterScreen();

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#0d0d0d] font-sans">
      {/* LEFT PANEL */}
      <div className="relative hidden flex-1 overflow-hidden lg:flex">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-[#0d0d0d]/20" />

        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200,184,154,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,184,154,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex w-full flex-col justify-end p-16 text-white">
          <span className="mb-12 text-[28px] font-extrabold tracking-[0.15em]">
            IKONIK
          </span>

          <h1 className="mb-6 text-6xl font-light leading-none tracking-tight">
            <span className="block">Bergabunglah</span>
            <span className="block">bersama</span>
            <span className="italic text-[#c8b89a]">layanan</span>
            <span className="block">terbaik kami.</span>
          </h1>

          <p className="mb-12 text-xs uppercase tracking-[0.2em] text-white/40">
            Customer Dashboard System — Ikonik Architecture
          </p>

          <div className="flex gap-10 border-t border-[#c8b89a]/15 pt-8">
            <div>
              <h3 className="text-4xl font-light text-[#c8b89a]">200+</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">
                Proyek
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-light text-[#c8b89a]">12+</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">
                Tahun
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-light text-[#c8b89a]">8</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">
                Awards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-[#f5f0e8] px-8 py-12 lg:w-[480px]">
        {/* Accent */}
        <div className="absolute left-0 top-0 h-[3px] w-[120px] bg-[#8b6914]" />

        {/* Circle decoration */}
        <div className="absolute -bottom-10 -right-10 h-[220px] w-[220px] rounded-full border-[40px] border-[#8b6914]/5" />

        <div className="relative z-10 w-full max-w-sm">
          {/* Back button */}
          <Link
            to="/"
            className="group mb-2 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#6b6456] transition hover:text-[#0d0d0d]"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Kembali ke Katalog
          </Link>

          <br />

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 border border-[#8b6914]/20 bg-[#8b6914]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b6914] rounded-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-[#8b6914]" />
            Registrasi Akun Baru
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-medium leading-none text-[#0d0d0d]">
              Daftar Visitor
            </h2>
            <p className="text-xs leading-relaxed text-[#6b6456]">
              Buat akun untuk melakukan checkout dan memantau pesanan material Anda.
            </p>
          </div>

          {/* Error Alert */}
          {errors.general && (
            <div className="mb-5 border border-red-200 border-l-[3px] border-l-red-600 bg-red-50 px-4 py-3 text-xs text-red-700">
              {errors.general}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAMA LENGKAP */}
            <div>
              <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b6456]">
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-sm border bg-white px-3.5 py-3 pr-10 text-xs outline-none transition-all ${
                    errors.name
                      ? "border-red-500 ring-2 ring-red-100"
                      : "border-black/10 focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10"
                  }`}
                />
                <User className="absolute right-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-black/30" />
              </div>
              {errors.name && (
                <p className="mt-1 text-[11px] text-red-600">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b6456]">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-sm border bg-white px-3.5 py-3 pr-10 text-xs outline-none transition-all ${
                    errors.email
                      ? "border-red-500 ring-2 ring-red-100"
                      : "border-black/10 focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10"
                  }`}
                />
                <Mail className="absolute right-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-black/30" />
              </div>
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b6456]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-sm border bg-white px-3.5 py-3 pr-10 text-xs outline-none transition-all ${
                    errors.password
                      ? "border-red-500 ring-2 ring-red-100"
                      : "border-black/10 focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40 transition hover:text-black/70"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[11px] text-red-600">{errors.password}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#6b6456]">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-sm border bg-white px-3.5 py-3 pr-10 text-xs outline-none transition-all ${
                    errors.confirmPassword
                      ? "border-red-500 ring-2 ring-red-100"
                      : "border-black/10 focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10"
                  }`}
                />
                <Lock className="absolute right-3.5 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-black/30" />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-[11px] text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-sm bg-[#0d0d0d] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition active:scale-[0.98] disabled:cursor-not-allowed cursor-pointer"
            >
              <div className="absolute inset-0 translate-x-[-101%] bg-[#8b6914] transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative z-10">
                {loading ? "Mendaftar..." : "Buat Akun Sekarang"}
              </span>
            </button>
          </form>

          {/* REDIRECT TO LOGIN */}
          <div className="mt-6 text-center text-xs text-[#6b6456]">
            Sudah memiliki akun?{" "}
            <Link
              to="/login"
              className="font-bold text-[#8b6914] transition hover:opacity-85"
            >
              Masuk di sini
            </Link>
          </div>

          {/* FOOTER */}
          <div className="mt-8 border-t border-black/10 pt-4 text-center text-[10px] tracking-wide text-[#6b6456]/60">
            © 2026 Ikonik Architecture · Customer Portal
          </div>
        </div>
      </div>
    </div>
  );
}

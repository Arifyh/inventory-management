import { Eye, EyeOff, Mail } from "lucide-react";

import useLoginScreen from "./useLoginScreen";

export default function LoginScreen() {
  const {
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
  } = useLoginScreen();

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
            <span className="block">Ruang kendali</span>
            <span className="block">untuk</span>
            <span className="italic text-[#c8b89a]">karya</span>
            <span className="block">yang abadi.</span>
          </h1>

          <p className="mb-12 text-xs uppercase tracking-[0.2em] text-white/40">
            Admin Management System — Ikonik Architecture
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
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-[#f5f0e8] px-8 py-16 lg:w-[480px]">
        {/* Accent */}
        <div className="absolute left-0 top-0 h-[3px] w-[120px] bg-[#8b6914]" />

        {/* Circle decoration */}
        <div className="absolute -bottom-10 -right-10 h-[220px] w-[220px] rounded-full border-[40px] border-[#8b6914]/5" />

        <div className="relative z-10 w-full">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 border border-[#8b6914]/20 bg-[#8b6914]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b6914]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#8b6914]" />
            Akses Admin & Staff
          </div>

          {/* Header */}
          <div className="mb-12">
            <h2 className="mb-3 text-5xl font-medium leading-none text-[#0d0d0d]">
              Selamat
              <br />
              Datang Kembali
            </h2>

            <p className="text-sm leading-7 text-[#6b6456]">
              Masukkan kredensial Anda untuk mengakses <br />
              Dashboard Inventory Ikonik.
            </p>
          </div>

          {/* Error Alert */}
          {errors.general && (
            <div className="mb-6 border border-red-200 border-l-[3px] border-l-red-600 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errors.general}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="mb-7">
              <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456]">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  placeholder="@ikonik.co.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-sm border bg-white px-4 py-4 pr-12 text-sm outline-none transition-all ${
                    errors.email
                      ? "border-red-500 ring-4 ring-red-100"
                      : "border-black/10 focus:border-[#8b6914] focus:ring-4 focus:ring-[#8b6914]/10"
                  }`}
                />

                <Mail className="absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-black/30" />
              </div>

              {errors.email && (
                <p className="mt-2 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-7">
              <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456]">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-sm border bg-white px-4 py-4 pr-12 text-sm outline-none transition-all ${
                    errors.password
                      ? "border-red-500 ring-4 ring-red-100"
                      : "border-black/10 focus:border-[#8b6914] focus:ring-4 focus:ring-[#8b6914]/10"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 transition hover:text-black/70"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* META */}
            <div className="mb-8 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 accent-[#8b6914]"
                />

                <span className="text-sm text-[#6b6456]">Ingat saya</span>
              </label>

              <button
                type="button"
                className="text-sm tracking-wide text-[#8b6914] transition hover:opacity-70"
              >
                Lupa password?
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-sm bg-[#0d0d0d] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition active:scale-[0.98] disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 translate-x-[-101%] bg-[#8b6914] transition-transform duration-300 group-hover:translate-x-0" />

              <span className="relative z-10">
                {loading ? "Memproses..." : "Masuk ke Dashboard"}
              </span>
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-10 border-t border-black/10 pt-6 text-center text-xs tracking-wide text-[#6b6456]/60">
            © 2024 Ikonik Architecture · Akses terbatas untuk admin
          </div>
        </div>
      </div>
    </div>
  );
}

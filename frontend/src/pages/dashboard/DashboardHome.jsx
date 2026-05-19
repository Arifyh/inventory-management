import React from "react";
import {
  PackageSearch,
  ArrowRightLeft,
  Tags,
  AlertTriangle,
  TrendingUp,
  User,
  Calendar,
  ArrowDownRight,
  ArrowUpRight,
  Scale,
  Layers,
  ChevronRight,
  TrendingDown,
} from "lucide-react";
import useDashboardStats from "./useDashboardStats";
import { useNavigate } from "react-router-dom";

// 1. Sleek SVG Bar Chart Component for weekly movements
const WeeklyChart = ({ data }) => {
  const height = 220;
  const paddingBottom = 40;
  const paddingTop = 20;
  const paddingLeft = 35;
  const paddingRight = 10;
  const chartHeight = height - paddingTop - paddingBottom;

  // Find max value to scale the bars
  const maxVal = Math.max(...data.map((d) => Math.max(d.in, d.out)), 10);
  const roundedMax = Math.ceil(maxVal / 5) * 5; // Clean intervals

  // Grid ticks
  const ticks = [
    0,
    Math.round(roundedMax * 0.33),
    Math.round(roundedMax * 0.66),
    roundedMax,
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#0d0d0d]">
            Volume Alur Barang
          </h4>
          <p className="text-[10px] text-[#6b6456] mt-0.5">
            Grafik stok masuk vs keluar 7 hari terakhir
          </p>
        </div>
        <div className="flex gap-4 text-[9px] font-bold uppercase tracking-[0.1em]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-green-600 rounded-sm" />
            <span className="text-[#6b6456]">Stok Masuk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-sm" />
            <span className="text-[#6b6456]">Stok Keluar</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[220px]">
        <svg
          viewBox="0 0 600 220"
          className="w-full h-full font-mono text-[9px]"
        >
          {/* Y Axis Gridlines and Ticks */}
          {ticks.map((tick, i) => {
            const y =
              height - paddingBottom - (tick / roundedMax) * chartHeight;
            return (
              <g key={i} className="opacity-70">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={600 - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth="0.75"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-[#6b6456] font-bold font-mono"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Bar Groups */}
          {data.map((d, index) => {
            const groupWidth = (600 - paddingLeft - paddingRight) / data.length;
            const xCenter = paddingLeft + index * groupWidth + groupWidth / 2;
            const barWidth = 14;
            const gap = 3;

            // In Bar
            const inHeight = (d.in / roundedMax) * chartHeight;
            const inY = height - paddingBottom - inHeight;
            const inX = xCenter - barWidth - gap / 2;

            // Out Bar
            const outHeight = (d.out / roundedMax) * chartHeight;
            const outY = height - paddingBottom - outHeight;
            const outX = xCenter + gap / 2;

            return (
              <g key={index} className="group/bar">
                {/* IN Rect */}
                {d.in > 0 ? (
                  <rect
                    x={inX}
                    y={inY}
                    width={barWidth}
                    height={inHeight}
                    fill="url(#greenGradient)"
                    rx="1.5"
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ) : (
                  <circle
                    cx={inX + barWidth / 2}
                    cy={height - paddingBottom}
                    r="1.5"
                    fill="#cbd5e1"
                  />
                )}
                {/* OUT Rect */}
                {d.out > 0 ? (
                  <rect
                    x={outX}
                    y={outY}
                    width={barWidth}
                    height={outHeight}
                    fill="url(#redGradient)"
                    rx="1.5"
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ) : (
                  <circle
                    cx={outX + barWidth / 2}
                    cy={height - paddingBottom}
                    r="1.5"
                    fill="#cbd5e1"
                  />
                )}

                {/* X Axis Label */}
                <text
                  x={xCenter}
                  y={height - 20}
                  textAnchor="middle"
                  className="fill-[#0d0d0d] font-sans font-bold text-[9px] uppercase tracking-wider"
                >
                  {d.label.split(" ")[0]}
                </text>
                <text
                  x={xCenter}
                  y={height - 8}
                  textAnchor="middle"
                  className="fill-[#6b6456]/70 font-sans text-[8px]"
                >
                  {d.label.substring(
                    d.label.indexOf("(") + 1,
                    d.label.indexOf(")"),
                  )}
                </text>

                {/* Tooltips/Value Labels on hover */}
                {d.in > 0 && (
                  <g className="opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200">
                    <rect
                      x={inX - 8}
                      y={inY - 20}
                      width={barWidth + 16}
                      height={14}
                      fill="#0d0d0d"
                      rx="2"
                    />
                    <text
                      x={inX + barWidth / 2}
                      y={inY - 10}
                      textAnchor="middle"
                      fill="#fff"
                      className="font-bold text-[8px]"
                    >
                      +{d.in}
                    </text>
                  </g>
                )}
                {d.out > 0 && (
                  <g className="opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200">
                    <rect
                      x={outX - 8}
                      y={outY - 20}
                      width={barWidth + 16}
                      height={14}
                      fill="#0d0d0d"
                      rx="2"
                    />
                    <text
                      x={outX + barWidth / 2}
                      y={outY - 10}
                      textAnchor="middle"
                      fill="#fff"
                      className="font-bold text-[8px]"
                    >
                      -{d.out}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Gradients */}
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default function DashboardHome({ user }) {
  const { stats, loading, error } = useDashboardStats();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="p-8 text-[#6b6456]">Memuat ringkasan dashboard...</div>
    );
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!stats) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 border border-[#8b6914]/20 bg-[#8b6914]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8b6914]">
            <div className="h-1.5 w-1.5 rounded-full bg-[#8b6914]" />
            Panel Ringkasan
          </div>
          <h2 className="text-3xl font-light text-[#0d0d0d]">
            Selamat Datang,
            <span className="font-medium">
              {" "}
              {user.role === "ADMIN"
                ? "Administrator"
                : user.name || user.email}
            </span>
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/dashboard/transactions")}
            className="flex items-center gap-1.5 bg-[#0d0d0d] hover:bg-[#8b6914] text-white px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
          >
            Pencatatan Stok
          </button>
        </div>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm flex items-start justify-between relative overflow-hidden group">
          <div className="absolute left-0 top-0 h-full w-[3px] bg-[#8b6914] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6456]">
              Total Katalog
            </p>
            <h3 className="text-2xl font-light text-[#0d0d0d] mt-2">
              {stats.totalProducts} Produk
            </h3>
            <span className="text-[9px] text-[#6b6456]/60 mt-1 block">
              Dalam {stats.totalCategories} Kategori berbeda
            </span>
          </div>
          <div className="h-10 w-10 bg-[#f5f0e8] flex items-center justify-center rounded-sm text-[#8b6914]">
            <PackageSearch className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm flex items-start justify-between relative overflow-hidden group">
          <div className="absolute left-0 top-0 h-full w-[3px] bg-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6456]">
              Transaksi Hari Ini
            </p>
            <h3 className="text-2xl font-light text-[#0d0d0d] mt-2">
              {stats.totalTransactionsToday} Transaksi
            </h3>
            <span className="text-[9px] text-emerald-600 font-bold mt-1 inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Baru masuk hari ini
            </span>
          </div>
          <div className="h-10 w-10 bg-emerald-50 border border-emerald-100 flex items-center justify-center rounded-sm text-emerald-600">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm flex items-start justify-between relative overflow-hidden group">
          <div className="absolute left-0 top-0 h-full w-[3px] bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6456]">
              Stok Menipis (Alert)
            </p>
            <h3
              className={`text-2xl font-bold mt-2 ${stats.lowStockCount > 0 ? "text-red-500" : "text-slate-700"}`}
            >
              {stats.lowStockCount} Item
            </h3>
            <span className="text-[9px] text-[#6b6456]/60 mt-1 block">
              Di bawah batas minimum stok
            </span>
          </div>
          <div
            className={`h-10 w-10 flex items-center justify-center rounded-sm border ${
              stats.lowStockCount > 0
                ? "bg-red-50 border-red-100 text-red-500 animate-pulse"
                : "bg-slate-50 border-slate-100 text-slate-400"
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm flex items-start justify-between relative overflow-hidden group">
          <div className="absolute left-0 top-0 h-full w-[3px] bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6456]">
              Total Kategori
            </p>
            <h3 className="text-2xl font-light text-[#0d0d0d] mt-2">
              {stats.totalCategories} Group
            </h3>
            <span className="text-[9px] text-[#6b6456]/60 mt-1 block">
              Klasifikasi katalog produk
            </span>
          </div>
          <div className="h-10 w-10 bg-blue-50 border border-blue-100 flex items-center justify-center rounded-sm text-blue-500">
            <Tags className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Charts & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Charts & Activities (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Card */}
          <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm">
            <WeeklyChart data={stats.weeklyMovement} />
          </div>

          {/* Recent Audit Log */}
          <div className="bg-white border border-[#0d0d0d]/10 rounded-sm shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#0d0d0d]/5 flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#0d0d0d]">
                  Audit Aktivitas Terakhir
                </h4>
                <p className="text-[10px] text-[#6b6456] mt-0.5">
                  Riwayat pencatatan keluar-masuk stok terbaru
                </p>
              </div>
              <button
                onClick={() => navigate("/dashboard/history")}
                className="text-[10px] font-bold uppercase text-[#8b6914] tracking-[0.1em] hover:underline flex items-center gap-1"
              >
                Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#0d0d0d]/5">
              {stats.recentActivity.map((act) => (
                <div
                  key={act.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-[#f5f0e8]/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 h-7 w-7 rounded-sm flex items-center justify-center border ${
                        act.type === "IN"
                          ? "bg-green-50 border-green-200 text-green-600"
                          : act.type === "OUT"
                            ? "bg-red-50 border-red-200 text-red-500"
                            : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      {act.type === "IN" && (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {act.type === "OUT" && (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                      {act.type === "ADJUSTMENT" && (
                        <Scale className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0d0d0d]">
                        {act.product.name}
                      </p>
                      <p className="text-[10px] text-[#6b6456] mt-0.5">
                        Oleh:{" "}
                        <span className="font-semibold">
                          {act.user.name || act.user.email}
                        </span>
                        {act.notes && ` • Keterangan: "${act.notes}"`}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                    <span
                      className={`text-sm font-bold ${
                        act.type === "IN"
                          ? "text-green-600"
                          : act.type === "OUT"
                            ? "text-red-500"
                            : "text-slate-600"
                      }`}
                    >
                      {act.type === "IN" ? "+" : act.type === "OUT" ? "-" : ""}
                      {act.quantity} {act.product.unit}
                    </span>
                    <span className="text-[9px] text-[#6b6456]/60 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {new Date(act.date || act.createdAt).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </span>
                  </div>
                </div>
              ))}
              {stats.recentActivity.length === 0 && (
                <div className="p-8 text-center text-[#6b6456] text-sm">
                  Belum ada aktivitas transaksi stok.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Categorization & Limits (1/3 width) */}
        <div className="space-y-6">
          {/* Category Distribution */}
          <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm space-y-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#0d0d0d]">
                Distribusi Kategori
              </h4>
              <p className="text-[10px] text-[#6b6456] mt-0.5">
                Distribusi jumlah produk per kategori
              </p>
            </div>

            <div className="space-y-4">
              {stats.categoryDistribution.map((cat, i) => {
                const percentage =
                  stats.totalProducts > 0
                    ? (cat.count / stats.totalProducts) * 100
                    : 0;
                return (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#0d0d0d]">
                        {cat.name}
                      </span>
                      <span className="text-[#6b6456] font-semibold">
                        {cat.count} Produk ({Math.round(percentage)}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#f5f0e8] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#8b6914] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {stats.categoryDistribution.length === 0 && (
                <div className="text-center text-[#6b6456] text-xs py-4">
                  Belum ada data kategori.
                </div>
              )}
            </div>
          </div>

          {/* Top Moving Products */}
          <div className="bg-white border border-[#0d0d0d]/10 p-6 rounded-sm shadow-sm space-y-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#0d0d0d]">
                Top Pergerakan Barang
              </h4>
              <p className="text-[10px] text-[#6b6456] mt-0.5">
                Produk paling aktif dalam 30 hari terakhir
              </p>
            </div>

            <div className="space-y-4">
              {stats.topMovingProducts.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border border-[#0d0d0d]/5 rounded-sm hover:border-[#8b6914]/20 transition-all bg-[#f5f0e8]/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-[#8b6914]/10 text-[#8b6914] flex items-center justify-center text-[10px] font-bold font-mono">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0d0d0d] truncate max-w-[130px]">
                        {p.name}
                      </p>
                      <p className="text-[9px] text-[#6b6456] font-mono mt-0.5">
                        {p.sku}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-[#0d0d0d]">
                      {p.totalVolume} Volume
                    </p>
                    <div className="flex gap-1.5 text-[8px] font-bold text-[#6b6456] mt-0.5 justify-end">
                      <span className="text-green-600">IN: {p.inVolume}</span>
                      <span>•</span>
                      <span className="text-red-500">OUT: {p.outVolume}</span>
                    </div>
                  </div>
                </div>
              ))}
              {stats.topMovingProducts.length === 0 && (
                <div className="text-center text-[#6b6456] text-xs py-4">
                  Belum ada aktivitas barang keluar/masuk.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function EmptyState({ title = "Data Belum Tersedia", description }) {
  return (
    <div className="bg-white rounded-sm p-12 border border-[#0d0d0d]/5 text-center min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[40px] border-[#8b6914]/5 rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <div className="w-20 h-20 bg-[#f5f0e8] border border-[#8b6914]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#8b6914]">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-light text-[#0d0d0d] mb-4">{title}</h3>
        <p className="text-sm text-[#6b6456] max-w-md mx-auto leading-relaxed">
          {description || "Halaman ini masih kosong. Silakan gunakan menu di samping untuk mulai mengelola sistem Anda."}
        </p>
      </div>
    </div>
  );
}

import React from 'react';

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-sm p-8 border border-[#0d0d0d]/5 shadow-sm flex items-start gap-6 relative overflow-hidden group">
      {/* Accent Line */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-[#8b6914] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      
      <div className="w-14 h-14 rounded-full border border-[#8b6914]/20 flex items-center justify-center bg-[#8b6914]/5 text-[#8b6914]">
        <Icon className="w-6 h-6" />
      </div>
      <div className="mt-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6456] mb-2">{title}</p>
        <h3 className="text-3xl font-light text-[#0d0d0d]">{value}</h3>
      </div>
    </div>
  );
}

import React from 'react';
import useCatalogScreen from './useCatalogScreen';

export default function Catalog() {
  const { handleLoginRedirect } = useCatalogScreen();

  return (
    <div className="p-4 bg-white shadow rounded-lg text-center min-h-screen flex items-center justify-center">
      <div className="max-w-md">
        <h2 className="text-3xl font-bold mb-4">Katalog Publik</h2>
        <p className="text-gray-600 mb-6">
          Selamat datang di Toko Material. Halaman ini nantinya akan
          berisi daftar produk untuk Visitor.
        </p>
        <button 
          onClick={handleLoginRedirect}
          className="text-blue-600 hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          Pergi ke halaman Login (Admin/Staff)
        </button>
      </div>
    </div>
  );
}

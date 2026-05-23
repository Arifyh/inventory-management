import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export default function useCatalogScreen() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('ALL');

  // Modal detail state
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Image gallery zoom state (index of image shown in detail modal)
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchCatalogData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch products and categories concurrently
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/products/public'),
        axios.get('http://localhost:5000/api/categories/public')
      ]);

      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error('Error fetching catalog data:', err);
      setError(err.response?.data?.message || 'Gagal memuat data katalog. Pastikan koneksi server aktif.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogData();
  }, []);

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  // Filtered products list memoized for performance
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Name search (case insensitive)
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategoryId === 'ALL' ||
        product.categoryId === parseInt(selectedCategoryId);

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategoryId]);

  // WhatsApp redirection
  const handleWhatsAppRedirect = (product) => {
    const phoneNumber = "6287813511027"; // Toko Material WhatsApp (+62 812-2556-8998)
    const priceFormatted = parseFloat(product.price).toLocaleString('id-ID');

    const message = `Halo Toko Material, saya ingin bertanya tentang produk berikut:
    
*${product.name}*
SKU: ${product.sku}
Kategori: ${product.category?.name || '-'}
Harga: Rp ${priceFormatted} / ${product.unit}
Status: ${product.stock > 0 ? 'Tersedia' : 'Habis'}

Apakah produk ini ready untuk dipesan?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  return {
    products,
    categories,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredProducts,
    selectedProduct,
    activeImageIndex,
    setActiveImageIndex,
    openProductDetail,
    closeProductDetail,
    handleWhatsAppRedirect,
    handleLoginRedirect
  };
}

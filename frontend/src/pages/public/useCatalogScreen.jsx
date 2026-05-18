export default function useCatalogScreen() {
  // Logic for fetching products will go here
  // For now, it's just a placeholder

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  return {
    handleLoginRedirect
  };
}

import { useState, useEffect, useCallback } from 'react';
import { getProducts, updateProductStatus } from '../api/productsApi';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => setError(err.message || 'Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const changeStatus = useCallback((id, status) => {
    return updateProductStatus(id, status).then(() => {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    });
  }, []);

  return { products, loading, error, refetch: fetchProducts, changeStatus };
}

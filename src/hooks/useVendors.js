import { useState, useEffect, useCallback } from 'react';
import { getVendors, updateVendorStatus } from '../api/vendorsApi';

export default function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendors = useCallback(() => {
    setLoading(true);
    getVendors()
      .then((data) => {
        setVendors(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => setError(err.message || 'Failed to load vendors'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const changeStatus = useCallback((id, status) => {
    return updateVendorStatus(id, status).then(() => {
      setVendors((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status } : v))
      );
    });
  }, []);

  return { vendors, loading, error, refetch: fetchVendors, changeStatus };
}

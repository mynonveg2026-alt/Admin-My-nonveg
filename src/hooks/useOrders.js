import { useState, useEffect, useCallback } from 'react';
import { getOrders, updateOrderStatus } from '../api/ordersApi';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(() => {
    setLoading(true);
    getOrders()
      .then((data) => {
        setOrders(data);
        setError(null);
      })
      .catch((err) => setError(err.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const changeStatus = useCallback((id, status) => {
    return updateOrderStatus(id, status).then(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    });
  }, []);

  return { orders, loading, error, refetch: fetchOrders, changeStatus };
}

import { useState, useEffect } from 'react';
import { getDashboardData } from '../api/dashboardApi';

export default function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDashboardData()
      .then((d) => {
        setData(d);
        setError(null);
      })
      .catch((err) => setError(err.message || 'Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

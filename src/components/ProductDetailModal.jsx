import { useState, useEffect } from 'react';
import { getProductById } from '../api/productsApi';

export default function ProductDetailModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductById(productId)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load product details'))
      .finally(() => setLoading(false));
  }, [productId]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors border-0 bg-transparent cursor-pointer text-xl leading-none"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Product Details</h2>

        {loading && <p className="text-center text-gray-400 text-sm py-6">Loading...</p>}
        {error && <p className="text-center text-red-500 text-sm py-6">{error}</p>}

        {product && (
          <div className="flex flex-col gap-5">
            {/* Image */}
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}

            {/* Details */}
            <div className="flex flex-col gap-3">
              <DetailRow label="Name" value={product.name} />
              <DetailRow label="Category" value={product.category} />
              <DetailRow label="Price" value={product.price != null ? `₹${product.price}` : undefined} />
              <DetailRow label="Vendor" value={product.vendorName ?? product.vendor} />
              <DetailRow label="Description" value={product.description} />
              <DetailRow
                label="Status"
                value={product.status}
                capitalize
                valueClass={
                  product.status === 'approved'
                    ? 'text-green-600 font-semibold'
                    : product.status === 'pending'
                    ? 'text-yellow-600 font-semibold'
                    : 'text-red-500 font-semibold'
                }
              />
              <DetailRow
                label="Added On"
                value={
                  product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : undefined
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value, capitalize, valueClass }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0 gap-4">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide flex-shrink-0">{label}</span>
      <span className={`text-sm font-medium text-gray-800 text-right ${capitalize ? 'capitalize' : ''} ${valueClass ?? ''}`}>
        {value ?? '—'}
      </span>
    </div>
  );
}

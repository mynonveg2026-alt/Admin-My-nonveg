import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductDetailModal from './ProductDetailModal';

export default function Products() {
  const { products, loading, error, changeStatus } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleApprove = (id) => changeStatus(id, 'approved');
  const handleReject = (id) => changeStatus(id, 'rejected');

  if (loading) return <div className="p-8 flex-1 text-gray-500">Loading products...</div>;
  if (error) return <div className="p-8 flex-1 text-red-500">Error: {error}</div>;

  return (
    <>
    <div className="p-8 bg-gray-100 flex-1 overflow-y-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Product Approvals</h1>

      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-gray-100 shadow-sm flex items-center gap-6 px-6 py-5"
          >
            {/* Product Image */}
            <img
              src={product.img}
              alt={product.name}
              className="w-28 h-24 object-cover rounded-lg flex-shrink-0"
            />

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{product.vendor}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl font-bold text-gray-900">{product.price}</span>
                <span className="text-sm text-gray-400">{product.category}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 flex-shrink-0 w-36">
              {product.status === 'pending' ? (
                <>
                  <button
                    onClick={() => handleApprove(product.id)}
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer border-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(product.id)}
                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer border-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Reject
                  </button>
                  <button
                    onClick={() => setSelectedProductId(product.id)}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md border border-gray-200 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Details
                  </button>
                </>
              ) : (
                <span
                  className={`text-center text-sm font-semibold px-4 py-2 rounded-md ${
                    product.status === 'approved'
                      ? 'bg-green-100 text-green-600 border border-green-200'
                      : 'bg-red-100 text-red-600 border border-red-200'
                  }`}
                >
                  {product.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    {selectedProductId && (
      <ProductDetailModal
        productId={selectedProductId}
        onClose={() => setSelectedProductId(null)}
      />
    )}
    </>
  );
}

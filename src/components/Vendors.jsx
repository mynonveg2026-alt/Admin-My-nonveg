import { useState } from 'react';
import useVendors from '../hooks/useVendors';

const filters = ['All', 'Pending', 'Approved', 'Rejected'];

const statusStyles = {
  Approved: 'bg-green-100 text-green-600 border border-green-200',
  Pending: 'bg-yellow-100 text-yellow-600 border border-yellow-200',
  Rejected: 'bg-red-100 text-red-600 border border-red-200',
};

export default function Vendors() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { vendors, loading, error, changeStatus } = useVendors();

  if (loading) return <div className="p-8 flex-1 text-gray-500">Loading vendors...</div>;
  if (error) return <div className="p-8 flex-1 text-red-500">Error: {error}</div>;

  const filtered =
    activeFilter === 'All'
      ? vendors
      : vendors.filter((v) => v.status === activeFilter);

  return (
    <div className="p-8 bg-gray-100 flex-1 overflow-y-auto">
      {/* Title + Filters */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors cursor-pointer ${
                activeFilter === f
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 w-[35%]">Vendor</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Rating</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Orders</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Revenue</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((vendor) => (
              <tr key={vendor.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                {/* Vendor */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={vendor.img}
                      alt={vendor.name}
                      className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{vendor.name}</p>
                      <p className="text-xs text-gray-400">{vendor.distance}</p>
                    </div>
                  </div>
                </td>

                {/* Rating */}
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
                    <span className="text-yellow-400">★</span>
                    {vendor.rating}
                  </span>
                </td>

                {/* Orders */}
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">{vendor.orders}</td>

                {/* Revenue */}
                <td className="px-6 py-4 text-sm font-semibold text-green-600">{vendor.revenue}</td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[vendor.status]}`}>
                    {vendor.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {vendor.status === 'Pending' || vendor.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => changeStatus(vendor.id, 'approved')}
                          className="text-xs font-semibold px-3 py-1.5 rounded-md bg-green-500 hover:bg-green-600 text-white border-0 cursor-pointer transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => changeStatus(vendor.id, 'rejected')}
                          className="text-xs font-semibold px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white border-0 cursor-pointer transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic capitalize">{vendor.status}</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

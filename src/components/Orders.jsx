import useOrders from '../hooks/useOrders';

const statusStyles = {
  delivered: 'bg-green-100 text-green-600 border border-green-200',
  'in-transit': 'bg-blue-100 text-blue-500 border border-blue-200',
  preparing: 'bg-yellow-100 text-yellow-500 border border-yellow-200',
  cancelled: 'bg-red-100 text-red-500 border border-red-200',
};

export default function Orders() {
  const { orders, loading, error } = useOrders();

  if (loading) return <div className="p-8 flex-1 text-gray-500">Loading orders...</div>;
  if (error) return <div className="p-8 flex-1 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-100 flex-1 overflow-y-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Monitoring</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Order ID</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Customer</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Vendor</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Amount</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-gray-800">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.vendor}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800">{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{order.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="flex items-center gap-1.5 text-blue-500 hover:text-blue-700 text-sm font-semibold bg-transparent border-0 cursor-pointer ml-auto transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

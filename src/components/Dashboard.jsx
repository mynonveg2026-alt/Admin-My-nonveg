import StatCard from './StatCard';
import useDashboard from '../hooks/useDashboard';

export default function Dashboard() {
  const { data, loading, error } = useDashboard();

  if (loading) return <div className="p-8 flex-1 text-gray-500">Loading dashboard...</div>;
  if (error) return <div className="p-8 flex-1 text-red-500">Error: {error}</div>;

  const statCards = [
    {
      icon: { symbol: '👥', bgColor: '#3b82f6' },
      title: 'Total Users',
      value: data?.totalUsers ?? 0,
    },
    {
      icon: { symbol: '🏪', bgColor: '#a855f7' },
      title: 'Total Vendors',
      value: data?.totalVendors ?? 0,
    },
    {
      icon: { symbol: '✅', bgColor: '#10b981' },
      title: 'Approved Vendors',
      value: data?.approvedVendors ?? 0,
    },
    {
      icon: { symbol: '⏳', bgColor: '#f97316' },
      title: 'Pending Vendors',
      value: data?.pendingVendors ?? 0,
    },
  ];

  return (
    <div className="p-8 bg-gray-100 flex-1 overflow-y-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Revenue Overview</h2>
          <div className="flex flex-col gap-4 min-h-[200px]">
            <div className="flex-1 bg-blue-700 rounded-md opacity-10"></div>
            <div className="flex justify-between px-3">
              {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'].map((day) => (
                <span key={day} className="text-xs text-gray-400 font-medium">{day}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Category Performance</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 min-w-[80px]">Chicken</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-700 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-xs font-semibold text-gray-500 min-w-[45px] text-right">75%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 min-w-[80px]">Fish</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-700 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-xs font-semibold text-gray-500 min-w-[45px] text-right">60%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 min-w-[80px]">Prawns</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-700 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-xs font-semibold text-gray-500 min-w-[45px] text-right">85%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 min-w-[80px]">Mutton</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-700 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <span className="text-xs font-semibold text-gray-500 min-w-[45px] text-right">50%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

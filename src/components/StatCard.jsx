export default function StatCard({ icon, title, value, change, changeType = 'positive' }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm flex gap-4 items-start border border-gray-100">
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl text-white flex-shrink-0 font-bold"
        style={{ backgroundColor: icon.bgColor }}
      >
        {icon.symbol}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide m-0">{title}</p>
        <p className="text-3xl font-bold text-gray-800 m-0">{value}</p>
        {change != null && (
          <p className={`text-xs font-semibold m-0 ${changeType === 'positive' ? 'text-emerald-500' : 'text-red-500'}`}>
            {changeType === 'positive' ? '↑' : '↓'} {change}
          </p>
        )}
      </div>
    </div>
  );
}

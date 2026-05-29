export default function Sidebar({ activePage, onNavigate }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'vendors', label: 'Vendors', icon: '🏪' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
  ];

  return (
    <aside className="w-60 bg-gray-50 border-r border-gray-200 py-5 overflow-y-auto flex-shrink-0">
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={
              activePage === item.id
                ? 'flex items-center gap-3 mx-2 px-4 py-3 bg-blue-700 text-white rounded-md text-sm font-medium border-0 cursor-pointer w-[calc(100%-16px)]'
                : 'flex items-center gap-3 px-5 py-3 bg-transparent text-gray-600 text-sm font-medium border-0 cursor-pointer w-full hover:bg-gray-200 hover:text-gray-800 transition-colors text-left'
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default function Header({ onLogout, onProfileClick }) {
  return (
    <header className="flex justify-between items-center bg-blue-700 text-white px-6 py-3 shadow-md sticky top-0 z-50">
      <div>
        <h1 className="text-2xl font-bold text-white m-0">MyNonVeg</h1>
      </div>
      <div className="flex items-center gap-6">
        <button className="bg-transparent border-0 text-white cursor-pointer p-2 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={onProfileClick}
          className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-white/10 transition-colors border-0 bg-transparent text-white"
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
            <span>👤</span>
          </div>
          <span className="text-sm font-medium">Admin</span>
        </button>
        <button
          onClick={onLogout}
          className="bg-white/10 border border-white/30 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-white/20 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

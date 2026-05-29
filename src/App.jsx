import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Vendors from './components/Vendors'
import Products from './components/Products'
import Orders from './components/Orders'
import Users from './components/Users'
import Login from './components/Login'
import ProfileModal from './components/ProfileModal'

const pages = {
  dashboard: <Dashboard />,
  users: <Users />,
  vendors: <Vendors />,
  products: <Products />,
  orders: <Orders />,
}

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('authToken')
  )
  const [showProfile, setShowProfile] = useState(false)

  const handleLoginSuccess = () => setIsAuthenticated(true)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header onLogout={handleLogout} onProfileClick={() => setShowProfile(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        {pages[activePage] ?? <Dashboard />}
      </div>
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  )
}

export default App

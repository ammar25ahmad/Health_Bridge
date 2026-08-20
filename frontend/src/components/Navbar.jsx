import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-slate-800">HealthBridge</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/resources" className="text-slate-600 hover:text-cyan-600 text-sm font-medium">Resources</Link>
            <Link to="/education" className="text-slate-600 hover:text-cyan-600 text-sm font-medium">Education</Link>
            {user && (
              <>
                <Link to="/ai-assistant" className="text-slate-600 hover:text-cyan-600 text-sm font-medium">AI Assistant</Link>
                <Link to="/agent" className="text-slate-600 hover:text-cyan-600 text-sm font-medium">Resource Agent</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-cyan-600 text-sm font-medium hidden sm:block">
                  Dashboard
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                    <span className="text-cyan-700 text-sm font-medium">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-slate-700 hidden sm:block">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-slate-500 hover:text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-slate-600 hover:text-cyan-600 font-medium">Login</Link>
                <Link
                  to="/register"
                  className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

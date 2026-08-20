import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="glass-nav border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/imgs/logo-no-bg.jpg" alt="HealthBridge" className="w-9 h-9 object-contain rounded-xl shadow-lg shadow-cyan-200/50" />
            <span className="text-xl font-bold gradient-text">HealthBridge</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link to="/resources" className="text-slate-600 hover:text-cyan-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-cyan-50 transition-all">Resources</Link>
            <Link to="/education" className="text-slate-600 hover:text-cyan-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-cyan-50 transition-all">Education</Link>
            {user && (
              <>
                <Link to="/ai-assistant" className="text-slate-600 hover:text-cyan-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-cyan-50 transition-all">AI Assistant</Link>
                <Link to="/agent" className="text-slate-600 hover:text-cyan-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-cyan-50 transition-all">Agent</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-cyan-600 text-sm font-medium hidden sm:block px-3 py-2 rounded-lg hover:bg-slate-100 transition-all">
                  Dashboard
                </Link>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-700 hidden sm:block">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-slate-500 hover:text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-slate-600 hover:text-cyan-600 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 transition-all">Login</Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all shadow-lg shadow-cyan-200/50"
                >
                  Register
                </Link>
              </>
            )}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              <Link to="/resources" className="text-slate-600 hover:text-cyan-600 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-cyan-50 transition-all" onClick={() => setMobileOpen(false)}>Resources</Link>
              <Link to="/education" className="text-slate-600 hover:text-cyan-600 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-cyan-50 transition-all" onClick={() => setMobileOpen(false)}>Education</Link>
              {user && (
                <>
                  <Link to="/ai-assistant" className="text-slate-600 hover:text-cyan-600 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-cyan-50 transition-all" onClick={() => setMobileOpen(false)}>AI Assistant</Link>
                  <Link to="/agent" className="text-slate-600 hover:text-cyan-600 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-cyan-50 transition-all" onClick={() => setMobileOpen(false)}>Agent</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

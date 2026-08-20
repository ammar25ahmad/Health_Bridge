import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-600 text-sm mt-1">Sign in to HealthBridge</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 text-white py-2.5 rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-600 hover:text-cyan-700 font-medium">Register</Link>
          </p>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center mb-2">Demo Accounts:</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button onClick={() => { setEmail('citizen@healthbridge.local'); setPassword('demo123') }}
                className="bg-slate-100 rounded-lg p-2 hover:bg-slate-200 transition-colors">
                <span className="font-medium text-slate-700">Citizen</span>
              </button>
              <button onClick={() => { setEmail('organization@healthbridge.local'); setPassword('demo123') }}
                className="bg-slate-100 rounded-lg p-2 hover:bg-slate-200 transition-colors">
                <span className="font-medium text-slate-700">Organization</span>
              </button>
              <button onClick={() => { setEmail('admin@healthbridge.local'); setPassword('demo123') }}
                className="bg-slate-100 rounded-lg p-2 hover:bg-slate-200 transition-colors">
                <span className="font-medium text-slate-700">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

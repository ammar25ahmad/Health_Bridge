import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Loading from '../components/Loading'

const ROLE_STYLES = {
  ADMIN: 'bg-purple-100 text-purple-700',
  ORGANIZATION: 'bg-blue-100 text-blue-700',
  CITIZEN: 'bg-green-100 text-green-700',
}

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CITIZEN' })
  const [submitting, setSubmitting] = useState(false)

  const fetchUsers = useCallback(async (query) => {
    setLoading(true)
    try {
      const url = query ? `/auth/users?search=${encodeURIComponent(query)}` : '/auth/users'
      const res = await api.get(url)
      setUsers(res.data.data.users || [])
      setError(null)
    } catch (err) {
      const status = err.response?.status
      const msg = err.response?.data?.message || 'Failed to load users'
      if (status === 403) setError('Access denied. You need an ADMIN account.')
      else if (status === 401) setError('Not authenticated. Please log in.')
      else setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchUsers('') }, [fetchUsers])

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(search), 300)
    return () => clearTimeout(timer)
  }, [search, fetchUsers])

  const handleDelete = async (id) => {
    if (!confirm('Delete this user? This action cannot be undone.')) return
    try {
      await api.delete(`/auth/users/${id}`)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/auth/admin/register', form)
      setShowForm(false)
      setForm({ name: '', email: '', password: '', role: 'CITIZEN' })
      fetchUsers(search)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create user')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Manage Users</h1>
          <p className="text-slate-500 mt-1">{users.length} registered users across the platform</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/dashboard" className="text-sm text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {['ADMIN', 'ORGANIZATION', 'CITIZEN'].map((role) => (
          <div key={role} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm card-hover">
            <p className="text-3xl font-extrabold text-slate-800">{users.filter(u => u.role === role).length}</p>
            <p className="text-sm text-slate-500 mt-1">{role.charAt(0) + role.slice(1).toLowerCase()}s</p>
          </div>
        ))}
      </div>

      {/* Search + Add */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-white shadow-sm"
          />
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all shadow-lg shadow-cyan-200 flex items-center gap-2 whitespace-nowrap"
        >
          {showForm ? 'Cancel' : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add User
            </>
          )}
        </button>
      </div>

      {/* Create User Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 space-y-4 shadow-sm animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
            <input type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required minLength={6} className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
            <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
              <option value="CITIZEN">Citizen</option>
              <option value="ORGANIZATION">Organization</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" disabled={submitting} className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-cyan-700 hover:to-teal-700 disabled:opacity-50 transition-all shadow-lg shadow-cyan-200">
            {submitting ? 'Creating...' : 'Create User'}
          </button>
        </form>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
          </div>
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      )}

      {/* Users Table */}
      {!error && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          {loading ? (
            <div className="py-12"><Loading /></div>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Role</th>
                    <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider hidden md:table-cell">Joined</th>
                    <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {u.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <span className="text-slate-800 font-semibold">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${ROLE_STYLES[u.role] || 'bg-slate-100 text-slate-500'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs hidden md:table-cell">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDelete(u.id)} className="text-red-600 hover:text-red-700 text-xs font-semibold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-sm">
                    {search ? `No users matching "${search}"` : 'No users found'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

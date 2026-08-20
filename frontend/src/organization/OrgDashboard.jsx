import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../store/authStore'
import Loading from '../components/Loading'

export default function OrgDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/resources')
        const resources = res.data.data.resources || []
        const myResources = resources.filter(r => r.createdBy === user?.id)
        setStats({
          total: myResources.length,
          active: myResources.filter(r => r.status === 'ACTIVE' || r.status === 'APPROVED').length,
          pending: myResources.filter(r => r.status === 'PENDING').length,
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [user])

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Organization Dashboard</h1>
        <p className="text-slate-500 mt-1">Manage your health resources and education content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm card-hover">
          <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <p className="text-3xl font-extrabold text-slate-800">{stats?.total || 0}</p>
          <p className="text-sm text-slate-500 mt-1">Total Resources</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm card-hover">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-3xl font-extrabold text-green-600">{stats?.active || 0}</p>
          <p className="text-sm text-slate-500 mt-1">Active</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm card-hover">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-3xl font-extrabold text-amber-600">{stats?.pending || 0}</p>
          <p className="text-sm text-slate-500 mt-1">Pending</p>
        </div>
        <Link to="/organization/resources" className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg shadow-cyan-200 card-hover">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
          <p className="text-xl font-bold">+ Add Resource</p>
          <p className="text-sm text-white/80 mt-1">Create new</p>
        </Link>
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/organization/resources" className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm card-hover group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">Manage Resources</h3>
              <p className="text-slate-500 text-sm">Create, edit, and update your health resources</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> {stats?.active || 0} active</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full"></span> {stats?.pending || 0} pending</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-cyan-600 font-semibold text-sm">
            Manage Resources
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        </Link>
        <Link to="/organization/education" className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm card-hover group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-600 transition-colors">Manage Education</h3>
              <p className="text-slate-500 text-sm">Add and edit health education articles</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Articles</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> 6 categories</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-green-600 font-semibold text-sm">
            Manage Education
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        </Link>
      </div>
    </div>
  )
}

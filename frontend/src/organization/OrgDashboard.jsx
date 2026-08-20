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
        const myResources = resources.filter(r => r.createdBy === user?._id)
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
        <h1 className="text-2xl font-bold text-slate-800">Organization Dashboard</h1>
        <p className="text-slate-600 text-sm mt-1">Manage your health resources and education content</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total Resources</p>
          <p className="text-2xl font-bold text-slate-800">{stats?.total || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Active</p>
          <p className="text-2xl font-bold text-green-600">{stats?.active || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{stats?.pending || 0}</p>
        </div>
        <Link to="/organization/resources" className="bg-cyan-600 text-white rounded-xl p-4 hover:bg-cyan-700 transition-colors">
          <p className="text-sm text-cyan-100">Quick Action</p>
          <p className="text-lg font-bold">+ Add Resource</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/organization/resources" className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-slate-800 mb-2">Manage Resources</h3>
          <p className="text-sm text-slate-600">Create, edit, and update your health resources</p>
        </Link>
        <Link to="/organization/education" className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-slate-800 mb-2">Manage Education</h3>
          <p className="text-sm text-slate-600">Add and edit health education articles</p>
        </Link>
      </div>
    </div>
  )
}

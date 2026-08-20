import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Loading from '../components/Loading'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [pendingResources, setPendingResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, resourcesRes, articlesRes] = await Promise.all([
          api.get('/resources?status=PENDING'),
          api.get('/resources'),
          api.get('/articles'),
        ])
        const resources = resourcesRes.data.data.resources || []
        const articles = articlesRes.data.data.articles || []
        const pending = resources.filter(r => r.status === 'PENDING')
        setPendingResources(pending)
        setStats({
          totalResources: resources.length,
          pendingResources: pending.length,
          totalArticles: articles.length,
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const handleApprove = async (id) => {
    try {
      await api.patch(`/resources/${id}/status`, { status: 'APPROVED' })
      setPendingResources(prev => prev.filter(r => r._id !== id))
      setStats(prev => ({ ...prev, pendingResources: prev.pendingResources - 1 }))
    } catch (err) {
      console.error(err)
    }
  }

  const handleReject = async (id) => {
    try {
      await api.patch(`/resources/${id}/status`, { status: 'REJECTED' })
      setPendingResources(prev => prev.filter(r => r._id !== id))
      setStats(prev => ({ ...prev, pendingResources: prev.pendingResources - 1 }))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-600 text-sm mt-1">Platform management and oversight</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total Resources</p>
          <p className="text-2xl font-bold text-slate-800">{stats?.totalResources || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Pending Approval</p>
          <p className="text-2xl font-bold text-amber-600">{stats?.pendingResources || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Articles</p>
          <p className="text-2xl font-bold text-slate-800">{stats?.totalArticles || 0}</p>
        </div>
        <Link to="/admin/users" className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
          <p className="text-sm text-slate-500">Manage</p>
          <p className="text-lg font-bold text-cyan-600">Users &rarr;</p>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Pending Resource Approvals</h2>
        {pendingResources.length === 0 ? (
          <p className="text-sm text-slate-500">No pending resources to review.</p>
        ) : (
          <div className="space-y-3">
            {pendingResources.map((resource) => (
              <div key={resource._id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">{resource.name}</p>
                  <p className="text-xs text-slate-500">{resource.category} &middot; {resource.location}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(resource._id)}
                    className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(resource._id)}
                    className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

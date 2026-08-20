import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Loading from '../components/Loading'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [pendingResources, setPendingResources] = useState([])
  const [allArticles, setAllArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [classifying, setClassifying] = useState(false)

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
        setAllArticles(articles)
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

  const handleClassifyAll = async () => {
    setClassifying(true)
    try {
      const res = await api.post('/articles/classify-all')
      const { classified } = res.data.data
      if (classified > 0) {
        const refreshed = await api.get('/articles')
        setAllArticles(refreshed.data.data.articles || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setClassifying(false)
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

      <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Article Content Analysis</h2>
          <button
            onClick={handleClassifyAll}
            disabled={classifying}
            className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-cyan-700 disabled:opacity-50 transition-colors"
          >
            {classifying ? 'Classifying...' : 'Run AI Classification'}
          </button>
        </div>
        {allArticles.length === 0 ? (
          <p className="text-sm text-slate-500">No articles yet.</p>
        ) : (
          <div className="space-y-3">
            {allArticles.map((article) => {
              const quality = article.classification?.qualityScore
              const keywords = article.classification?.keywords || []
              const hasQuality = quality != null
              const qualityColor = !hasQuality ? 'text-slate-400' : quality >= 0.7 ? 'text-green-600' : quality >= 0.4 ? 'text-amber-600' : 'text-red-600'
              const qualityBg = !hasQuality ? 'bg-slate-100' : quality >= 0.7 ? 'bg-green-100' : quality >= 0.4 ? 'bg-amber-100' : 'bg-red-100'
              const aiCategory = article.classification?.category || article.category
              return (
                <div key={article._id} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-slate-800">{article.title}</p>
                      <p className="text-xs text-slate-500">{article.category} &middot; AI Detected: {aiCategory}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${qualityBg} ${qualityColor}`}>
                      Quality: {hasQuality ? `${(quality * 100).toFixed(0)}%` : '—'}
                    </span>
                  </div>
                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {keywords.slice(0, 6).map((kw, i) => (
                        <span key={i} className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

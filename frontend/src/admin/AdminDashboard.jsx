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
        <h1 className="text-3xl font-extrabold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Platform management and oversight</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-5 text-white shadow-lg shadow-cyan-200 card-hover">
          <p className="text-3xl font-extrabold">{stats?.totalResources || 0}</p>
          <p className="text-sm text-white/80 mt-1">Total Resources</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-5 text-white shadow-lg shadow-amber-200 card-hover">
          <p className="text-3xl font-extrabold">{stats?.pendingResources || 0}</p>
          <p className="text-sm text-white/80 mt-1">Pending Approval</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-green-200 card-hover">
          <p className="text-3xl font-extrabold">{stats?.totalArticles || 0}</p>
          <p className="text-sm text-white/80 mt-1">Articles</p>
        </div>
        <Link to="/admin/users" className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200 card-hover">
          <p className="text-lg font-bold">Manage Users →</p>
          <p className="text-sm text-white/80 mt-1">View all accounts</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pending Approvals */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-800">Pending Approvals</h2>
            {pendingResources.length > 0 && (
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">{pendingResources.length} pending</span>
            )}
          </div>
          {pendingResources.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">No pending resources to review.</p>
          ) : (
            <div className="space-y-3">
              {pendingResources.map((resource) => (
                <div key={resource._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-semibold text-slate-800">{resource.name}</p>
                    <p className="text-xs text-slate-500">{resource.category} &middot; {resource.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(resource._id)} className="bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-green-600 transition-colors">
                      Approve
                    </button>
                    <button onClick={() => handleReject(resource._id)} className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-5">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/admin/users" className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl hover:from-cyan-100 hover:to-teal-100 transition-all border border-cyan-100">
              <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <span className="font-semibold text-slate-800 text-sm">Manage Users</span>
            </Link>
            <Link to="/admin/resources" className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all border border-blue-100">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <span className="font-semibold text-slate-800 text-sm">Manage Resources</span>
            </Link>
            <Link to="/admin/education" className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all border border-green-100">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <span className="font-semibold text-slate-800 text-sm">Manage Education</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Article Analysis */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Article Content Analysis</h2>
          <button
            onClick={handleClassifyAll}
            disabled={classifying}
            className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all shadow-lg shadow-cyan-200 disabled:opacity-50 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
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
              return (
                <div key={article._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{article.title}</p>
                      <p className="text-xs text-slate-500">{article.category} &middot; AI: {article.classification?.category || article.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {keywords.length > 0 && (
                      <div className="hidden md:flex gap-1">
                        {keywords.slice(0, 3).map((kw, i) => (
                          <span key={i} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full">{kw}</span>
                        ))}
                      </div>
                    )}
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${qualityBg} ${qualityColor}`}>
                      {hasQuality ? `${(quality * 100).toFixed(0)}%` : '—'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

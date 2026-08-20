import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'
import { useResources, useArticles } from '../hooks/useResources'

export default function Dashboard() {
  const { user } = useAuth()

  if (user?.role === 'ORGANIZATION') return <Navigate to="/organization/dashboard" replace />
  if (user?.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />

  return <CitizenDashboard />
}

function CitizenDashboard() {
  const { user } = useAuth()
  const { resources, loading: resourcesLoading } = useResources({ status: 'APPROVED', limit: 4 })
  const { articles, loading: articlesLoading } = useArticles({ limit: 4 })

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-slate-800">{getGreeting()}, {user?.name}! 👋</h1>
        <p className="text-slate-500 mt-1">Here's what's happening with your health resources today.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link to="/resources" className="bg-white rounded-2xl p-5 border border-slate-100 card-hover group text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <p className="font-semibold text-slate-800">Find Resources</p>
          <p className="text-xs text-slate-500 mt-0.5">Search health centers</p>
        </Link>
        <Link to="/education" className="bg-white rounded-2xl p-5 border border-slate-100 card-hover group text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-200 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <p className="font-semibold text-slate-800">Education</p>
          <p className="text-xs text-slate-500 mt-0.5">Health articles</p>
        </Link>
        <Link to="/ai-assistant" className="bg-white rounded-2xl p-5 border border-slate-100 card-hover group text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </div>
          <p className="font-semibold text-slate-800">AI Assistant</p>
          <p className="text-xs text-slate-500 mt-0.5">Ask health questions</p>
        </Link>
        <Link to="/agent" className="bg-white rounded-2xl p-5 border border-slate-100 card-hover group text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
          <p className="font-semibold text-slate-800">Resource Agent</p>
          <p className="text-xs text-slate-500 mt-0.5">Smart search</p>
        </Link>
      </div>

      {/* Featured Resources */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-800">Featured Resources</h2>
          <Link to="/resources" className="text-sm text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        {resourcesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.slice(0, 4).map((r) => (
              <Link key={r._id} to={`/resources/${r._id}`} className="bg-white rounded-2xl border border-slate-100 p-5 card-hover">
                <span className="text-xs font-bold bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-full">{r.category}</span>
                <h3 className="font-semibold text-slate-800 mt-3">{r.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Health Education */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-slate-800">Health Education</h2>
          <Link to="/education" className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        {articlesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.slice(0, 4).map((a) => (
              <Link key={a._id} to={`/education/${a._id}`} className="bg-white rounded-2xl border border-slate-100 p-5 card-hover">
                <span className="text-xs font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full">{a.category}</span>
                <h3 className="font-semibold text-slate-800 mt-3">{a.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{a.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

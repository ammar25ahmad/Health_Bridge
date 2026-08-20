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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user?.name}!</h1>
        <p className="text-slate-600 text-sm mt-1">Find health resources and learn about wellness</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link to="/resources" className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-cyan-300 transition-all text-center">
          <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-700">Find Resources</p>
        </Link>
        <Link to="/education" className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-green-300 transition-all text-center">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-700">Health Education</p>
        </Link>
        <Link to="/ai-assistant" className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-indigo-300 transition-all text-center">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-700">Ask AI</p>
        </Link>
        <Link to="/agent" className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-purple-300 transition-all text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-700">Resource Agent</p>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Featured Resources</h2>
          <Link to="/resources" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">View All</Link>
        </div>
        {resourcesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.slice(0, 4).map((r) => (
              <Link key={r._id} to={`/resources/${r._id}`} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
                <span className="text-xs font-medium bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">{r.category}</span>
                <h3 className="font-medium text-slate-800 mt-2">{r.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Health Education</h2>
          <Link to="/education" className="text-sm text-green-600 hover:text-green-700 font-medium">View All</Link>
        </div>
        {articlesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.slice(0, 4).map((a) => (
              <Link key={a._id} to={`/education/${a._id}`} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{a.category}</span>
                <h3 className="font-medium text-slate-800 mt-2">{a.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{a.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

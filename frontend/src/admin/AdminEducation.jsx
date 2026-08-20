import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Loading from '../components/Loading'

export default function AdminEducation() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/articles')
        setArticles(res.data.data.articles || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this article?')) return
    try {
      await api.delete(`/articles/${id}`)
      setArticles(prev => prev.filter(a => a._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Manage Education</h1>
          <p className="text-slate-500 mt-1">{articles.length} articles across the platform</p>
        </div>
        <Link to="/admin/dashboard" className="text-sm text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Title</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Quality</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider hidden md:table-cell">Keywords</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => {
              const quality = a.classification?.qualityScore
              const keywords = a.classification?.keywords || []
              const hasQuality = quality != null
              const qualityColor = !hasQuality ? 'text-slate-400' : quality >= 0.7 ? 'text-green-600' : quality >= 0.4 ? 'text-amber-600' : 'text-red-600'
              return (
                <tr key={a._id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-800 font-semibold">{a.title}</td>
                  <td className="px-6 py-4 text-slate-600">{a.category}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold text-sm ${qualityColor}`}>{hasQuality ? `${(quality * 100).toFixed(0)}%` : '—'}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {keywords.slice(0, 3).map((kw, i) => (
                        <span key={i} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(a._id)} className="text-red-600 hover:text-red-700 text-xs font-semibold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all">Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">No articles found</p>
          </div>
        )}
      </div>
    </div>
  )
}

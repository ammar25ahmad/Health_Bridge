import { useState, useEffect } from 'react'
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
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Manage Education</h1>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a._id} className="border-t border-slate-100">
                <td className="px-4 py-3 text-slate-800">{a.title}</td>
                <td className="px-4 py-3 text-slate-600">{a.category}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(a._id)} className="text-red-600 hover:text-red-700 text-xs font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && <p className="text-center py-8 text-slate-500 text-sm">No articles found</p>}
      </div>
    </div>
  )
}

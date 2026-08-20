import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../store/authStore'
import Loading from '../components/Loading'

export default function OrgEducation() {
  const { user } = useAuth()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'Nutrition', summary: '', content: '' })
  const [submitting, setSubmitting] = useState(false)

  const fetchArticles = async () => {
    try {
      const res = await api.get('/articles')
      const all = res.data.data.articles || []
      setArticles(all.filter(a => a.createdBy === user?.id))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchArticles() }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/articles', form)
      setShowForm(false)
      setForm({ title: '', category: 'Nutrition', summary: '', content: '' })
      fetchArticles()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create article')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/organization/dashboard" className="text-sm text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Health Education Articles</h1>
            <p className="text-slate-500 mt-1">Create and manage health education content</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-200 flex items-center gap-2"
        >
          {showForm ? 'Cancel' : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add Article
            </>
          )}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 space-y-4 shadow-sm animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Article Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
              <option>Nutrition</option>
              <option>Hygiene</option>
              <option>Vaccination</option>
              <option>First Aid</option>
              <option>Preventive Care</option>
              <option>Healthy Lifestyle</option>
            </select>
          </div>
          <input type="text" placeholder="Summary" value={form.summary} onChange={(e) => setForm({...form, summary: e.target.value})} className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
          <textarea placeholder="Full article content (use new lines for paragraphs)" value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} required className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm h-40 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
          <button type="submit" disabled={submitting} className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-green-200">
            {submitting ? 'Creating...' : 'Create Article'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Title</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Quality</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider hidden md:table-cell">Keywords</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Created</th>
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
                  <td className="px-6 py-4 text-slate-500 text-xs">{new Date(a.createdAt).toLocaleDateString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">No articles yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

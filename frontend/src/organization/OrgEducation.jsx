import { useState, useEffect } from 'react'
import api from '../api/axios'
import Loading from '../components/Loading'

export default function OrgEducation() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'Nutrition', summary: '', content: '' })
  const [submitting, setSubmitting] = useState(false)

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

  useEffect(() => { fetchArticles() }, [])

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Health Education Articles</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
          {showForm ? 'Cancel' : '+ Add Article'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Article Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="border border-slate-300 rounded-lg px-3 py-2 text-sm">
              <option>Nutrition</option>
              <option>Hygiene</option>
              <option>Vaccination</option>
              <option>First Aid</option>
              <option>Preventive Care</option>
              <option>Healthy Lifestyle</option>
            </select>
          </div>
          <input type="text" placeholder="Summary" value={form.summary} onChange={(e) => setForm({...form, summary: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
          <textarea placeholder="Full article content (use new lines for paragraphs)" value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm h-40" />
          <button type="submit" disabled={submitting} className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">
            {submitting ? 'Creating...' : 'Create Article'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Created</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a._id} className="border-t border-slate-100">
                <td className="px-4 py-3 text-slate-800">{a.title}</td>
                <td className="px-4 py-3 text-slate-600">{a.category}</td>
                <td className="px-4 py-3 text-slate-500">{new Date(a.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && <p className="text-center py-8 text-slate-500 text-sm">No articles yet.</p>}
      </div>
    </div>
  )
}

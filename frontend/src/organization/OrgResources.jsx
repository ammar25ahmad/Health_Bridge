import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../store/authStore'
import Loading from '../components/Loading'

export default function OrgResources() {
  const { user } = useAuth()
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', category: 'Clinics', description: '', location: '', contactInformation: '', availability: '' })
  const [submitting, setSubmitting] = useState(false)

  const fetchResources = async () => {
    try {
      const res = await api.get('/resources')
      const all = res.data.data.resources || []
      setResources(all.filter(r => r.createdBy === user?.id))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchResources() }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/resources', form)
      setShowForm(false)
      setForm({ name: '', category: 'Clinics', description: '', location: '', contactInformation: '', availability: '' })
      fetchResources()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create resource')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this resource?')) return
    try {
      await api.delete(`/resources/${id}`)
      setResources(prev => prev.filter(r => r._id !== id))
    } catch (err) {
      console.error(err)
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
            <h1 className="text-3xl font-extrabold text-slate-800">My Resources</h1>
            <p className="text-slate-500 mt-1">Manage your health resource submissions</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all shadow-lg shadow-cyan-200 flex items-center gap-2"
        >
          {showForm ? 'Cancel' : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add Resource
            </>
          )}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 space-y-4 shadow-sm animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Resource Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all">
              <option>Clinics</option>
              <option>Vaccination Centers</option>
              <option>Emergency Contacts</option>
              <option>Mental Wellness</option>
              <option>Preventive Care</option>
              <option>Public Health Programs</option>
            </select>
          </div>
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm h-24 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
            <input type="text" placeholder="Contact Information" value={form.contactInformation} onChange={(e) => setForm({...form, contactInformation: e.target.value})} className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
            <input type="text" placeholder="Availability" value={form.availability} onChange={(e) => setForm({...form, availability: e.target.value})} className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all" />
          </div>
          <button type="submit" disabled={submitting} className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-cyan-700 hover:to-teal-700 disabled:opacity-50 transition-all shadow-lg shadow-cyan-200">
            {submitting ? 'Creating...' : 'Create Resource'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-4 font-bold text-slate-600 text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r._id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-800 font-semibold">{r.name}</td>
                <td className="px-6 py-4 text-slate-600">{r.category}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    r.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                    r.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>{r.status}</span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:text-red-700 text-xs font-semibold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {resources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">No resources yet. Create your first resource!</p>
          </div>
        )}
      </div>
    </div>
  )
}

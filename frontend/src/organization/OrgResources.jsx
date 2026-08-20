import { useState, useEffect } from 'react'
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Resources</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700">
          {showForm ? 'Cancel' : '+ Add Resource'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Resource Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="border border-slate-300 rounded-lg px-3 py-2 text-sm">
              <option>Clinics</option>
              <option>Vaccination Centers</option>
              <option>Emergency Contacts</option>
              <option>Mental Wellness</option>
              <option>Preventive Care</option>
              <option>Public Health Programs</option>
            </select>
          </div>
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm h-24" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
            <input type="text" placeholder="Contact Information" value={form.contactInformation} onChange={(e) => setForm({...form, contactInformation: e.target.value})} className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
            <input type="text" placeholder="Availability" value={form.availability} onChange={(e) => setForm({...form, availability: e.target.value})} className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <button type="submit" disabled={submitting} className="bg-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 disabled:opacity-50">
            {submitting ? 'Creating...' : 'Create Resource'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r._id} className="border-t border-slate-100">
                <td className="px-4 py-3 text-slate-800">{r.name}</td>
                <td className="px-4 py-3 text-slate-600">{r.category}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    r.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                    r.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>{r.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:text-red-700 text-xs font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {resources.length === 0 && <p className="text-center py-8 text-slate-500 text-sm">No resources yet. Create your first resource!</p>}
      </div>
    </div>
  )
}

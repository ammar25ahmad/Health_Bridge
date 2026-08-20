import { useState, useEffect } from 'react'
import api from '../api/axios'
import Loading from '../components/Loading'

export default function AdminUsers() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await api.get('/resources')
        setResources(res.data.data.resources || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

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
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Manage Resources</h1>
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
                    r.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>{r.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:text-red-700 text-xs font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {resources.length === 0 && <p className="text-center py-8 text-slate-500 text-sm">No resources found</p>}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Loading from '../components/Loading'

export default function AdminResources() {
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

  const handleStatus = async (id, status) => {
    try {
      await api.patch(`/resources/${id}/status`, { status })
      setResources(prev => prev.map(r => r._id === id ? { ...r, status } : r))
    } catch (err) {
      console.error(err)
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
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Manage Resources</h1>
          <p className="text-slate-500 mt-1">{resources.length} total resources across the platform</p>
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
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    r.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                    r.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                    r.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>{r.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {r.status === 'PENDING' && (
                      <>
                        <button onClick={() => handleStatus(r._id, 'APPROVED')} className="bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-100 transition-all">Approve</button>
                        <button onClick={() => handleStatus(r._id, 'REJECTED')} className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition-all">Reject</button>
                      </>
                    )}
                    <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:text-red-700 text-xs font-semibold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {resources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">No resources found</p>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { resourceApi } from '../api/resourceApi'
import ResourceCard from '../components/ResourceCard'
import ResourceSearch from '../components/ResourceSearch'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

export default function Resources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchResources = async (filters = {}) => {
    setLoading(true)
    setError(null)
    try {
      const res = await resourceApi.getResources({ ...filters, status: 'APPROVED' })
      setResources(res.data.data.resources || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch resources')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Health Resources</h1>
        <p className="text-slate-600 text-sm mt-1">Find clinics, vaccination centers, and community health programs</p>
      </div>

      <div className="mb-6">
        <ResourceSearch onSearch={fetchResources} />
      </div>

      {error && <ErrorMessage message={error} onRetry={() => fetchResources()} />}

      {loading ? (
        <Loading />
      ) : resources.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-slate-600 font-medium">No resources found</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  )
}

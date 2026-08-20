import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { resourceApi } from '../api/resourceApi'
import Loading from '../components/Loading'

export default function ResourceDetails() {
  const { id } = useParams()
  const [resource, setResource] = useState(null)
  const [relevance, setRelevance] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await resourceApi.getResource(id)
        setResource(res.data.data.resource)
        setRelevance(res.data.data.relevanceAnalysis || null)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchResource()
  }, [id])

  if (loading) return <Loading />
  if (!resource) return <div className="text-center py-16 text-slate-600">Resource not found</div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/resources" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium mb-4 inline-block">
        &larr; Back to Resources
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{resource.name}</h1>
            <span className="text-xs font-medium bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-full mt-2 inline-block">
              {resource.category}
            </span>
          </div>
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
            resource.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
            resource.status === 'INACTIVE' ? 'bg-slate-100 text-slate-500' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {resource.status}
          </span>
        </div>

        <div className="space-y-4 mt-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Description</h3>
            <p className="text-slate-700">{resource.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resource.location && (
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-500 mb-1">Location</h4>
                <p className="text-slate-700 text-sm">{resource.location}</p>
              </div>
            )}
            {resource.contactInformation && (
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-500 mb-1">Contact Information</h4>
                <p className="text-slate-700 text-sm">{resource.contactInformation}</p>
              </div>
            )}
            {resource.availability && (
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-500 mb-1">Availability</h4>
                <p className="text-slate-700 text-sm">{resource.availability}</p>
              </div>
            )}
            {resource.organization && (
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-500 mb-1">Organization</h4>
                <p className="text-slate-700 text-sm">{resource.organization}</p>
              </div>
            )}
          </div>

          {resource.analysis && (
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-cyan-700 mb-2">AI Resource Analysis</h4>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-cyan-600 font-medium">Category:</span>
                  <p className="text-slate-700">{resource.analysis.category}</p>
                </div>
                <div>
                  <span className="text-cyan-600 font-medium">Type:</span>
                  <p className="text-slate-700">{resource.analysis.resourceType}</p>
                </div>
                <div>
                  <span className="text-cyan-600 font-medium">Relevance:</span>
                  <p className="text-slate-700">{(resource.analysis.relevanceScore * 100).toFixed(0)}%</p>
                </div>
              </div>

              {relevance && (
                <div className="mt-4 pt-3 border-t border-cyan-200">
                  <h4 className="text-sm font-semibold text-cyan-700 mb-2">Content Quality Breakdown</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-slate-500">Relevance Score</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${(relevance.relevanceScore * 100).toFixed(0)}%` }} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{(relevance.relevanceScore * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-slate-500">Quality Score</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(relevance.qualityScore * 100).toFixed(0)}%` }} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{(relevance.qualityScore * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-slate-500">Weighted Score</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(relevance.weightedScore * 100).toFixed(0)}%` }} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{(relevance.weightedScore * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-xs text-amber-700">
              <strong>Note:</strong> This information is provided for general educational purposes.
              Please verify details directly with the organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

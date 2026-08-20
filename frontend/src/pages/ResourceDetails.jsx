import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { resourceApi } from '../api/resourceApi'
import Loading from '../components/Loading'

const CATEGORY_COLORS = {
  'Clinics': 'from-blue-500 to-blue-600',
  'Vaccination Centers': 'from-green-500 to-emerald-600',
  'Emergency Contacts': 'from-red-500 to-rose-600',
  'Mental Wellness': 'from-purple-500 to-violet-600',
  'Preventive Care': 'from-amber-500 to-orange-600',
  'Public Health Programs': 'from-cyan-500 to-teal-600',
}

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
  if (!resource) return <div className="text-center py-20 text-slate-600 font-bold text-lg">Resource not found</div>

  const barGradient = CATEGORY_COLORS[resource.category] || 'from-cyan-500 to-teal-600'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/resources" className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 font-semibold mb-6 group">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Resources
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Hero Bar */}
        <div className={`h-2 bg-gradient-to-r ${barGradient}`}></div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 mb-3">{resource.name}</h1>
              <span className="text-xs font-bold bg-cyan-50 text-cyan-700 px-3 py-1.5 rounded-full">
                {resource.category}
              </span>
            </div>
            <span className={`text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 ${
              resource.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
              resource.status === 'INACTIVE' ? 'bg-slate-100 text-slate-500' :
              'bg-amber-100 text-amber-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                resource.status === 'ACTIVE' ? 'bg-green-500' :
                resource.status === 'INACTIVE' ? 'bg-slate-400' : 'bg-amber-500'
              }`}></span>
              {resource.status}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-slate-700 leading-relaxed">{resource.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resource.location && (
                <div className="bg-slate-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <h4 className="text-sm font-bold text-slate-500">Location</h4>
                  </div>
                  <p className="text-slate-700 text-sm">{resource.location}</p>
                </div>
              )}
              {resource.contactInformation && (
                <div className="bg-slate-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <h4 className="text-sm font-bold text-slate-500">Contact</h4>
                  </div>
                  <p className="text-slate-700 text-sm">{resource.contactInformation}</p>
                </div>
              )}
              {resource.availability && (
                <div className="bg-slate-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h4 className="text-sm font-bold text-slate-500">Availability</h4>
                  </div>
                  <p className="text-slate-700 text-sm">{resource.availability}</p>
                </div>
              )}
              {resource.organization && (
                <div className="bg-slate-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <h4 className="text-sm font-bold text-slate-500">Organization</h4>
                  </div>
                  <p className="text-slate-700 text-sm">{resource.organization}</p>
                </div>
              )}
            </div>

            {resource.analysis && (
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-2xl p-6">
                <h4 className="text-sm font-bold text-cyan-800 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  AI Resource Analysis
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-cyan-600 font-semibold">Category:</span>
                    <p className="text-slate-700 mt-0.5">{resource.analysis.category}</p>
                  </div>
                  <div>
                    <span className="text-cyan-600 font-semibold">Type:</span>
                    <p className="text-slate-700 mt-0.5">{resource.analysis.resourceType}</p>
                  </div>
                  <div>
                    <span className="text-cyan-600 font-semibold">Relevance:</span>
                    <p className="text-slate-700 mt-0.5">{(resource.analysis.relevanceScore * 100).toFixed(0)}%</p>
                  </div>
                </div>

                {relevance && (
                  <div className="pt-4 border-t border-cyan-200">
                    <h4 className="text-sm font-bold text-cyan-800 mb-3">Content Quality Breakdown</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Relevance Score', value: relevance.relevanceScore, color: 'from-cyan-500 to-cyan-600' },
                        { label: 'Quality Score', value: relevance.qualityScore, color: 'from-green-500 to-emerald-600' },
                        { label: 'Weighted Score', value: relevance.weightedScore, color: 'from-amber-500 to-orange-600' },
                      ].map((item) => (
                        <div key={item.label} className="bg-white rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-xs font-semibold text-slate-500">{item.label}</p>
                            <span className="text-sm font-bold text-slate-700">{(item.value * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${(item.value * 100).toFixed(0)}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs text-amber-700 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                <strong>Note:</strong> This information is provided for general educational purposes. Please verify details directly with the organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

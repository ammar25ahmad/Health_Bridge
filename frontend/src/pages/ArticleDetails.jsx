import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { resourceApi } from '../api/resourceApi'
import Loading from '../components/Loading'

const CATEGORY_COLORS = {
  'Nutrition': 'from-green-500 to-emerald-600',
  'Hygiene': 'from-blue-500 to-indigo-600',
  'Vaccination': 'from-purple-500 to-violet-600',
  'First Aid': 'from-red-500 to-rose-600',
  'Preventive Care': 'from-amber-500 to-orange-600',
  'Healthy Lifestyle': 'from-cyan-500 to-teal-600',
}

const CATEGORY_BADGES = {
  'Nutrition': 'bg-green-50 text-green-700',
  'Hygiene': 'bg-blue-50 text-blue-700',
  'Vaccination': 'bg-purple-50 text-purple-700',
  'First Aid': 'bg-red-50 text-red-700',
  'Preventive Care': 'bg-amber-50 text-amber-700',
  'Healthy Lifestyle': 'bg-cyan-50 text-cyan-700',
}

export default function ArticleDetails() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await resourceApi.getArticle(id)
        setArticle(res.data.data.article)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  if (loading) return <Loading />
  if (!article) return <div className="text-center py-20 text-slate-600 font-bold text-lg">Article not found</div>

  const barGradient = CATEGORY_COLORS[article.category] || 'from-cyan-500 to-teal-600'
  const badgeClass = CATEGORY_BADGES[article.category] || 'bg-slate-50 text-slate-700'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/education" className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 font-semibold mb-6 group">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Education
      </Link>

      <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className={`h-2 bg-gradient-to-r ${barGradient}`}></div>

        <div className="p-8">
          <span className={`text-xs font-bold ${badgeClass} px-3 py-1.5 rounded-full inline-block mb-4`}>
            {article.category}
          </span>

          <h1 className="text-3xl font-extrabold text-slate-800 mb-4">{article.title}</h1>

          <div className="flex items-center gap-4 text-sm text-slate-500 mb-8 pb-6 border-b border-slate-100">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              {article.author || 'HealthBridge'}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>

          {article.summary && (
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 mb-8 border border-slate-200">
              <p className="text-slate-700 italic leading-relaxed">{article.summary}</p>
            </div>
          )}

          <div className="prose prose-slate max-w-none">
            {article.content?.split('\n').map((paragraph, i) => (
              <p key={i} className="text-slate-700 mb-4 leading-relaxed">{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs text-amber-700 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              <strong>Disclaimer:</strong> This article provides general educational health information. It is not a substitute for professional medical advice. Always consult qualified healthcare professionals for personal medical concerns.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}

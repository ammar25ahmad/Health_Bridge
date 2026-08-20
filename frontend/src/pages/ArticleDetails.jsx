import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { resourceApi } from '../api/resourceApi'
import Loading from '../components/Loading'

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
  if (!article) return <div className="text-center py-16 text-slate-600">Article not found</div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/education" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium mb-4 inline-block">
        &larr; Back to Education
      </Link>

      <article className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="mb-4">
          <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
            {article.category}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
          <span>By {article.author || 'HealthBridge'}</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>

        {article.summary && (
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <p className="text-slate-700 italic">{article.summary}</p>
          </div>
        )}

        <div className="prose prose-slate max-w-none">
          {article.content?.split('\n').map((paragraph, i) => (
            <p key={i} className="text-slate-700 mb-4 leading-relaxed">{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-xs text-amber-700">
            <strong>Disclaimer:</strong> This article provides general educational health information.
            It is not a substitute for professional medical advice. Always consult qualified healthcare
            professionals for personal medical concerns.
          </p>
        </div>
      </article>
    </div>
  )
}

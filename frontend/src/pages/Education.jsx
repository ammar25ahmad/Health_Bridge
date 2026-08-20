import { useState, useEffect } from 'react'
import { resourceApi } from '../api/resourceApi'
import ArticleCard from '../components/ArticleCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const CATEGORIES = ['All', 'Nutrition', 'Hygiene', 'Vaccination', 'First Aid', 'Preventive Care', 'Healthy Lifestyle']

const CATEGORY_ICONS = {
  'All': '📋',
  'Nutrition': '🥗',
  'Hygiene': '🧼',
  'Vaccination': '💉',
  'First Aid': '🩹',
  'Preventive Care': '🛡️',
  'Healthy Lifestyle': '🏃',
}

export default function Education() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const fetchArticles = async (category) => {
    setLoading(true)
    setError(null)
    try {
      const params = category && category !== 'All' ? { category } : {}
      const res = await resourceApi.getArticles(params)
      setArticles(res.data.data.articles || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch articles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles(selectedCategory)
  }, [selectedCategory])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Health Education</h1>
        <p className="text-slate-500 mt-1">Learn about nutrition, hygiene, vaccination, and more</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-200'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-cyan-300 hover:bg-cyan-50'
            }`}
          >
            <span className="mr-1.5">{CATEGORY_ICONS[cat]}</span>
            {cat}
          </button>
        ))}
      </div>

      {error && <ErrorMessage message={error} onRetry={() => fetchArticles(selectedCategory)} />}

      {loading ? (
        <Loading />
      ) : articles.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <p className="text-slate-800 font-bold text-lg">No articles found</p>
          <p className="text-sm text-slate-500 mt-1">Check back later for new content</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

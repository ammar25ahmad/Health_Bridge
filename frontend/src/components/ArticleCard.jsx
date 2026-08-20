import { Link } from 'react-router-dom'

const CATEGORY_COLORS = {
  'Nutrition': 'bg-green-100 text-green-700',
  'Hygiene': 'bg-blue-100 text-blue-700',
  'Vaccination': 'bg-purple-100 text-purple-700',
  'First Aid': 'bg-red-100 text-red-700',
  'Preventive Care': 'bg-amber-100 text-amber-700',
  'Healthy Lifestyle': 'bg-cyan-100 text-cyan-700',
}

export default function ArticleCard({ article }) {
  const colorClass = CATEGORY_COLORS[article.category] || 'bg-slate-100 text-slate-700'

  return (
    <Link
      to={`/education/${article._id}`}
      className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-cyan-300 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-lg leading-tight">{article.title}</h3>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${colorClass}`}>
          {article.category}
        </span>
      </div>
      <p className="text-sm text-slate-600 mb-3 line-clamp-3">{article.summary}</p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>By {article.author || 'HealthBridge'}</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>
    </Link>
  )
}

import { Link } from 'react-router-dom'

const CATEGORY_STYLES = {
  'Nutrition': { badge: 'bg-green-50 text-green-700', bar: 'from-green-500 to-emerald-600' },
  'Hygiene': { badge: 'bg-blue-50 text-blue-700', bar: 'from-blue-500 to-indigo-600' },
  'Vaccination': { badge: 'bg-purple-50 text-purple-700', bar: 'from-purple-500 to-violet-600' },
  'First Aid': { badge: 'bg-red-50 text-red-700', bar: 'from-red-500 to-rose-600' },
  'Preventive Care': { badge: 'bg-amber-50 text-amber-700', bar: 'from-amber-500 to-orange-600' },
  'Healthy Lifestyle': { badge: 'bg-cyan-50 text-cyan-700', bar: 'from-cyan-500 to-teal-600' },
}

export default function ArticleCard({ article }) {
  const styles = CATEGORY_STYLES[article.category] || { badge: 'bg-slate-50 text-slate-700', bar: 'from-slate-500 to-slate-600' }

  return (
    <Link
      to={`/education/${article._id}`}
      className="block bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover group"
    >
      <div className={`h-1.5 bg-gradient-to-r ${styles.bar}`}></div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className={`text-xs font-bold ${styles.badge} px-3 py-1 rounded-full`}>
            {article.category}
          </span>
        </div>
        <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-cyan-600 transition-colors line-clamp-2">{article.title}</h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-3">{article.summary}</p>
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            {article.author || 'HealthBridge'}
          </span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  )
}

import { Link } from 'react-router-dom'

const CATEGORY_COLORS = {
  'Clinics': 'bg-blue-100 text-blue-700',
  'Vaccination Centers': 'bg-green-100 text-green-700',
  'Emergency Contacts': 'bg-red-100 text-red-700',
  'Mental Wellness': 'bg-purple-100 text-purple-700',
  'Preventive Care': 'bg-amber-100 text-amber-700',
  'Public Health Programs': 'bg-cyan-100 text-cyan-700',
}

export default function ResourceCard({ resource }) {
  const colorClass = CATEGORY_COLORS[resource.category] || 'bg-slate-100 text-slate-700'

  return (
    <Link
      to={`/resources/${resource._id}`}
      className="block bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-cyan-300 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-lg leading-tight">{resource.name}</h3>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${colorClass}`}>
          {resource.category}
        </span>
      </div>
      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{resource.description}</p>
      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
        {resource.location && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {resource.location}
          </span>
        )}
        {resource.availability && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {resource.availability}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
          resource.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
          resource.status === 'INACTIVE' ? 'bg-slate-100 text-slate-500' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {resource.status}
        </span>
        {resource.contactInformation && (
          <span className="text-xs text-slate-400">{resource.contactInformation}</span>
        )}
      </div>
    </Link>
  )
}

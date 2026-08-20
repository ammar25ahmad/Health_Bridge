import { Link } from 'react-router-dom'

const CATEGORY_STYLES = {
  'Clinics': { bg: 'from-blue-500 to-blue-600', icon: 'bg-blue-100 text-blue-600', badge: 'bg-blue-50 text-blue-700' },
  'Vaccination Centers': { bg: 'from-green-500 to-emerald-600', icon: 'bg-green-100 text-green-600', badge: 'bg-green-50 text-green-700' },
  'Emergency Contacts': { bg: 'from-red-500 to-rose-600', icon: 'bg-red-100 text-red-600', badge: 'bg-red-50 text-red-700' },
  'Mental Wellness': { bg: 'from-purple-500 to-violet-600', icon: 'bg-purple-100 text-purple-600', badge: 'bg-purple-50 text-purple-700' },
  'Preventive Care': { bg: 'from-amber-500 to-orange-600', icon: 'bg-amber-100 text-amber-600', badge: 'bg-amber-50 text-amber-700' },
  'Public Health Programs': { bg: 'from-cyan-500 to-teal-600', icon: 'bg-cyan-100 text-cyan-600', badge: 'bg-cyan-50 text-cyan-700' },
}

const CATEGORY_ICONS = {
  'Clinics': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  'Vaccination Centers': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'Emergency Contacts': 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  'Mental Wellness': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'Preventive Care': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'Public Health Programs': 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
}

export default function ResourceCard({ resource }) {
  const styles = CATEGORY_STYLES[resource.category] || { bg: 'from-slate-500 to-slate-600', icon: 'bg-slate-100 text-slate-600', badge: 'bg-slate-50 text-slate-700' }
  const iconPath = CATEGORY_ICONS[resource.category] || CATEGORY_ICONS['Clinics']

  return (
    <Link
      to={`/resources/${resource._id}`}
      className="block bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover group"
    >
      <div className={`h-1.5 bg-gradient-to-r ${styles.bg}`}></div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 ${styles.icon} rounded-xl flex items-center justify-center`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} /></svg>
          </div>
          <span className={`text-xs font-bold ${styles.badge} px-3 py-1 rounded-full`}>
            {resource.category}
          </span>
        </div>
        <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-cyan-600 transition-colors">{resource.name}</h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{resource.description}</p>
        <div className="space-y-2">
          {resource.location && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {resource.location}
            </div>
          )}
          {resource.availability && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {resource.availability}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
            resource.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
            resource.status === 'INACTIVE' ? 'bg-slate-100 text-slate-500' :
            'bg-amber-100 text-amber-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              resource.status === 'ACTIVE' ? 'bg-green-500' :
              resource.status === 'INACTIVE' ? 'bg-slate-400' : 'bg-amber-500'
            }`}></span>
            {resource.status}
          </span>
          {resource.contactInformation && (
            <span className="text-xs text-slate-400">{resource.contactInformation}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

import { useState } from 'react'

const CATEGORIES = [
  'All',
  'Clinics',
  'Vaccination Centers',
  'Emergency Contacts',
  'Mental Wellness',
  'Preventive Care',
  'Public Health Programs',
]

export default function ResourceSearch({ onSearch }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [location, setLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({
      search: search.trim(),
      category: category === 'All' ? '' : category,
      location: location.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search health resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all shadow-lg shadow-cyan-200"
      >
        Search Resources
      </button>
    </form>
  )
}

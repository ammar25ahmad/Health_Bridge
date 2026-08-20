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
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:col-span-2 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
      <button
        type="submit"
        className="mt-3 bg-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors"
      >
        Search
      </button>
    </form>
  )
}

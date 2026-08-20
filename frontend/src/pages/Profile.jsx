import { useAuth } from '../store/authStore'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8">Profile</h1>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-cyan-500 to-teal-600 h-24"></div>
        <div className="px-8 pb-8">
          <div className="flex items-end gap-5 -mt-10 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{user?.name}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-slate-100">
              <span className="text-sm text-slate-500">Role</span>
              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">{user?.role}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-100">
              <span className="text-sm text-slate-500">Member since</span>
              <span className="text-sm font-semibold text-slate-700">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

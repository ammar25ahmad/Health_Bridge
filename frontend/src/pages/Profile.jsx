import { useAuth } from '../store/authStore'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Profile</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-cyan-700">{user?.name?.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{user?.name}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-sm text-slate-500">Role</span>
            <span className="text-sm font-medium text-slate-700">{user?.role}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-sm text-slate-500">Member since</span>
            <span className="text-sm font-medium text-slate-700">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

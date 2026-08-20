import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/authStore'
import Loading from './Loading'

export default function RoleRoute({ children, roles }) {
  const { user, loading } = useAuth()

  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace />
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />

  return children
}

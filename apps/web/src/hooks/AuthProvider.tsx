import { Navigate } from 'react-router-dom'
import { useStore } from '../store/store'

export const AuthorizedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { admin } = useStore()

  if (!admin) {
    return <Navigate to="/admin/login" />
  }
  return children
}

export const AuthorizedUserRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useStore()

  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}

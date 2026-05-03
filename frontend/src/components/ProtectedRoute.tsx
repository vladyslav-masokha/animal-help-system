import { Navigate } from 'react-router-dom'
import { getUser, isAuthenticated } from '../utils/auth'

interface Props {
	children: React.ReactNode
	requireAdmin?: boolean
}

const ProtectedRoute = ({ children, requireAdmin = false }: Props) => {
	if (!isAuthenticated()) {
		return <Navigate to='/login' replace />
	}

	if (requireAdmin && getUser()?.role !== 'Admin') {
		return <Navigate to='/' replace />
	}

	return <>{children}</>
}

export default ProtectedRoute

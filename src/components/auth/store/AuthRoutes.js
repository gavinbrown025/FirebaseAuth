import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const AuthRoutes = ({ authRequired }) => {
	const { currentUser } = useAuth()
	if (authRequired) {
        // stop people from getting into private routes
        // if authentication is required and there is a current user go to next route(Outlet)
		return currentUser ? <Outlet /> : <Navigate to='/login' />
	} else {
        // stop people from seeing login/signup when already authenticated
        return !currentUser ? <Outlet /> : <Navigate to='/' />
	}
}

export default AuthRoutes

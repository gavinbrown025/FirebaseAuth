import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/auth/store/AuthContext'

import AuthRoutes from './components/auth/store/AuthRoutes'
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

import './App.scss'
import bgImg from './images/tri-tb-left.svg'

const App = () => {
	return (
		<main className='App'>
			<AuthProvider>
				<Router>
					<Routes>
						{/* // pages NOT accessible when authorized */}
						<Route element={<AuthRoutes />}>
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<Signup />} />
						</Route>

						{/* // pages with authorization required */}
						<Route element={<AuthRoutes authRequired />}>
							<Route path={'/'} element={<Dashboard />} />
						</Route>

						{/* // regular Routes below */}
						{/* <Route path='/page' element={<Page />} /> */}
					</Routes>
				</Router>
			</AuthProvider>
		</main>
	)
}

export default App

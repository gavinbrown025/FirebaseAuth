import { useState, useEffect } from 'react'
import { useAuth } from '../auth/store/AuthContext'

import './Dashboard.scss'

import logo from '../../images/logo-lo-know.png'
import { doc, getDoc } from 'firebase/firestore'

const Dashboard = () => {
	const { currentUser, signout, db } = useAuth()

	const [user, setUser] = useState({})

	useEffect(() => {
		const getUser = async () => {
			const docRef = doc(db, 'users', currentUser.uid)
			const userData = await getDoc(docRef)
			setUser({
				...currentUser,
				...userData.data(),
			})
		}
		getUser()
	}, [])

	return (
		<div className='dashboard'>
      <h1 className="hidden">Dashboard</h1>
			<header>
				<div className='nav-con container flex jcsb'>
					<div className='logo'>
						<img src={logo} alt='logo' />
					</div>
					<nav>
						<ul className='flex aic'>
							{user.name && <li className="dashboard__username">{user.name}</li>}
							<li>
								<button onClick={signout}>Sign Out</button>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<section className='dashboard__content'>
				<div className='container'>
					<h2 className='white-font'>Welcome to the your LoKnow Dashboard!</h2>
				</div>
			</section>
		</div>
	)
}

export default Dashboard

import { createContext, useContext, useState, useEffect } from 'react'

import { auth, db } from './firebase'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const listener = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setLoading(false)
		})

		return listener //cleanup
	}, [])

	const signup = async (signupData) => {
		const addUser = await createUserWithEmailAndPassword(auth, signupData.email, signupData.password)

        const userDocRef = doc(db, 'users', addUser.user.uid)
		await setDoc(userDocRef, {
			name: signupData.name,
			email: signupData.email,
			phoneNumber: signupData.phoneNumber,
			postalCode: signupData.postalCode,
		})

	}

	const login = ({ email, password }) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const signout = () => {
		return signOut(auth)
	}

	const value = {
		currentUser,
		signup,
		login,
		signout,
		alert,
		db,
	}

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

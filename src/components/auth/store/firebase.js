import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDmCSzG47YAJVG2xYDKx2sTyVhuEs0bLo4',
	authDomain: 'loknow-ba722.firebaseapp.com',
	projectId: 'loknow-ba722',
	storageBucket: 'loknow-ba722.appspot.com',
	messagingSenderId: '447677976705',
	appId: '1:447677976705:web:d60769a88aa477870e7d80',
}

export const firebase = initializeApp(firebaseConfig)
export const auth = getAuth(firebase)
export const db = getFirestore(firebase)

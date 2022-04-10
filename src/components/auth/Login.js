import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from './store/AuthContext'
import { loginValidator } from './store/validateForm'

import Input from './UI/Input'
import './Auth.scss'

const Login = () => {
	const navigate = useNavigate()
	const { login } = useAuth()

	const [errors, setErrors] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const submitLogin = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		let errorCheck = loginValidator(loginData)
		let hasErrors = Object.values(errorCheck).some((error) => !!error)

		setErrors(errorCheck)

		if (hasErrors) return setIsLoading(false)

		try {
			await login(loginData)
			navigate('/')
		} catch (err) {
			setErrors({
				server: err.code,
			})
		}
		setIsLoading(false)
	}

	return (
		<section className='auth-con'>
			<div className='container flex acc'>

				<div className='auth__inner card flex-c'>
					<form onSubmit={submitLogin}>
						<h1 className='t-center'>Log In</h1>
						<Input
							input={{
								name: 'email',
								value: loginData.email,
								onChange: handleChange,
								type: 'email',
							}}
							label={'Email*'}
							error={errors.email}
						/>

						<Input
							input={{
								name: 'password',
								value: loginData.password,
								onChange: handleChange,
								type: 'password',
							}}
							label={'Password*'}
							error={errors.password}
						/>

						<div className='submit-con signup__btn'>
							<button type='submit' disabled={isLoading}>
								Log In
							</button>
						</div>
					</form>
					<div className='auth__ex-links t-center'>
						Already have an account?
						<Link to='/signup'>Sign Up</Link>
					</div>
				</div>
				{errors.server && <div className='alert'>{errors.server}</div>}
			</div>
		</section>
	)
}

export default Login

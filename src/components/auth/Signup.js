import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { signupValidator } from './store/validateForm'
import { useAuth } from './store/AuthContext'

import Input from './UI/Input'
import './Auth.scss'

const Signup = () => {
	const navigate = useNavigate()
	const { signup } = useAuth()

	const [errors, setErrors] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	const [signupData, setSignupData] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
		phoneNumber: '',
		postalCode: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setSignupData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const submitSignup = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		let errorCheck = signupValidator(signupData)
		let hasErrors = Object.values(errorCheck).some((error) => !!error)

		setErrors(errorCheck)

		if (hasErrors) return setIsLoading(false)

		try {
			await signup(signupData)
		} catch (err) {
			console.warn(err.code)
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
					<form onSubmit={submitSignup}>
						<h1 className='t-center'>Sign Up</h1>

						<Input
							input={{
								name: 'name',
								value: signupData.name,
								onChange: handleChange,
								type: 'text',
							}}
							label={'Name*'}
							error={errors.name}
						/>

						<Input
							input={{
								name: 'email',
								value: signupData.email,
								onChange: handleChange,
								type: 'email',
							}}
							label={'Email*'}
							error={errors.email}
						/>

						<Input
							input={{
								name: 'password',
								value: signupData.password,
								onChange: handleChange,
								type: 'password',
							}}
							label={'Password*'}
							error={errors.password}
						/>

						<Input
							input={{
								name: 'passwordConfirm',
								value: signupData.passwordConfirm,
								onChange: handleChange,
								type: 'password',
							}}
							label={'Password Confirmation*'}
							error={errors.passwordConfirm}
						/>

						<div className='split-input '>
							<Input
								input={{
									name: 'phoneNumber',
									value: signupData.phoneNumber,
									onChange: handleChange,
									type: 'tel',
									placeholder: 'e.g. 555-555-5555',
								}}
								label={'Phone Number'}
								error={errors.phoneNumber}
							/>

							<Input
								input={{
									name: 'postalCode',
									value: signupData.postalCode,
									onChange: handleChange,
									type: 'text',
									placeholder: 'e.g. A1B 2C3 or 12345-1235',
								}}
								label={'Postal Code'}
								error={errors.postalCode}
							/>
						</div>

						<div className='submit-con signup__btn'>
							<button type='submit' disabled={isLoading}>
								Submit
							</button>
						</div>
					</form>

					<div className='auth__ex-links t-center'>
						Already have an account?
						<Link to='/login'>Login</Link>
					</div>
				</div>
			</div>
			{errors.server && <div className='alert'>{errors.server}</div>}
		</section>
	)
}

export default Signup

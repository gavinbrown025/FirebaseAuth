export const signupValidator = (signupData) => {
	return {
		name: isUsernameError(signupData.name),
		email: isEmailError(signupData.email),
		password: isPasswordError(signupData.password),
		passwordConfirm: isPasswordConfirmError(signupData.password, signupData.passwordConfirm),
		phoneNumber: isPhoneError(signupData.phoneNumber),
		postalCode: isPostalCodeError(signupData.postalCode),
	}
}

export const loginValidator = (loginData) => {
	return {
		email: isEmailError(loginData.email),
		password: isPasswordError(loginData.password),
	}
}

const isUsernameError = (name) => {
	if (!name.trim()) return 'Username Required'
	if (name.trim().length < 3) return 'Username must be at least 3 characters'
	return false
}

const isEmailError = (email) => {
	if (!email.trim()) {
		return 'Email Required'
	}
	if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email.trim())) {
		return 'Email Invalid'
	}
	return false
}

const isPasswordError = (password) => {
	if (!password.trim()) {
		return 'Password Required'
	}
	if (password.trim().length < 6) {
		return 'Password must be at least 6 characters'
	}
	if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(password.trim())) {
		return 'Password must contain an upercase letter, and a number'
	}
	return false
}

const isPasswordConfirmError = (password, passwordConfirm) => {
    if (!password.trim()) {
		return 'Confirmation Required'
	}
	if (passwordConfirm.trim() !== password.trim()) {
		return 'Passwords must match'
	}
    return false
}

const isPhoneError = (phoneNumber) => {
	if (!phoneNumber.trim()) return false
	if (!/[(]?\d{3}[-.)]?[ ]?\d{3}[-.]?\d{4}\b/.test(phoneNumber.trim())) {
		return 'Please enter a valid phone number or leave blank'
	}
	return false
}

const isPostalCodeError = (postalCode) => {
	if (!postalCode.trim()) return false
	if (!/(^\d{5}([ \-]?\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ \-]?\d{1}[A-Z]{1}\d{1}$)/i.test(postalCode.trim())) {
		return 'Please enter a valid Postal Code'
	}
	return false
}


import React from 'react'
import './Input.scss'

const Input = ({input, error, label}) => {
	return (
		<div className={`input-con ${error && 'error'}`}>
			{label && <label htmlFor={input.name}>{label}</label>}
			<input {...input} className={`${error && 'error'}`}  />
			{error && <p>{error}</p>}
		</div>
	)
}

export default Input
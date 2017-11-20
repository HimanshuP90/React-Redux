import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	let errors = {};

	if (Validator.isNull(data.username)) {
		errors.username = 'Username is required';
	}
	
	if (!Validator.isEmail(data.email)){
		errors.email = 'Email is required';
	}

	if (Validator.isNull(data.password)) {
		errors.password = 'Password is required';
	}

	if (Validator.isNull(data.passwordConfirmation)) {
		errors.passwordConfirmation = 'This field is required';
	}

	if (!Validator.equals(data.password, data.passwordConfirmation)) {
		errors.passwordConfirmation = 'Password must match';
	}

	if (Validator.isNull(data.timeZone)) {
		errors.timeZone = 'This filed is required';
	}	

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
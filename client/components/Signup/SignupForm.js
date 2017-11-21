import React from 'react';
import timezones from '../../data/timezone';
import map from 'lodash/map';
import classnames from'classnames';
import PropTypes from 'prop-types';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';

class SignupForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			timeZone: '',
			errors: {},
			isLoading: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);
	
		if (!isValid) {
			this.setState({ errors });
		}	

		return isValid;
	}

	onSubmit(e) {
		e.preventDefault()		
		
		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.userSignupRequest(this.state).then(
				() => {
					browserHistory.push('/');
				},
				(error) => {this.setState({ errors: error.response.data})}
			)
		}
	}

	render() {
			
			const { errors } = this.state;

		    const options = map(timezones, (val, key) =>
		      <option key={val} value={val}>{key}</option>
		    );

    		return (
			<form onSubmit={this.onSubmit}>
				<h1>Create an account .. !</h1>
				<TextFieldGroup
				 error = {errors.username}
				 label="Username"
				 onChange={this.onChange}
				 value={this.state.username}
				 field="username"
				/>

				<TextFieldGroup
				 error = {errors.email}
				 label="Email"
				 onChange={this.onChange}
				 value={this.state.email}
				 field="email"
				/>

				<TextFieldGroup
				 error = {errors.password}
				 label="Password"
				 onChange={this.onChange}
				 value={this.state.password}
				 field="password"
				 type="password"
				/>

				<TextFieldGroup
				 error = {errors.passwordConfirmation}
				 label="Password Confirmation"
				 onChange={this.onChange}
				 value={this.state.passwordConfirmation}
				 field="passwordConfirmation"
				 type="password"
				/>
				<div className={classnames("form-group", {'has-error': errors.timeZone})}>
					<label className="control-label">Timezone</label>
					<select
						onChange={this.onChange}
						value={this.state.timeZone}
						name="timeZone"
						className="form-control"
					>
					<option value="" disabled> Choose Your Zone </option>
						{options}
					</select>
					{errors.timeZone && <span className="help-block">{errors.timeZone}</span>}
				</div>

				<div className="form-group">
					<button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
				 		Sign up
				 	</button>
				</div>
			</form>
		);
	}
} 

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
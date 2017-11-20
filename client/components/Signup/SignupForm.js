import React from 'react';
import timezones from '../../data/timezone';
import map from 'lodash/map';
import classnames from'classnames';
import PropTypes from 'prop-types';
import validateInput from '../../../server/shared/validations/signup';

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
				() => {},
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
				<div className={classnames("form-group", {'has-error': errors.username})}>
					<label className="control-label">Username</label>
					<input
						value={this.state.username}
						onChange={this.onChange}
						type="text"
						name="username"
						className="form-control"
					/>
					{errors.username && <span className="help-block">{errors.username}</span>}
				</div>

				<div className={classnames("form-group", {'has-error': errors.email})}>
					<label className="control-label">Email</label>
					<input
						onChange={this.onChange}
						value={this.state.email}
						type="text"
						name="email"
						className="form-control"
					/>
					{errors.email && <span className="help-block">{errors.email}</span>}					
				</div>

				<div className={classnames("form-group", {'has-error': errors.password})}>
					<label className="control-label">Password</label>
					<input
						onChange={this.onChange}
						value={this.state.password}
						type="password"
						name="password"
						className="form-control"
					/>
					{errors.password && <span className="help-block">{errors.password}</span>}
				</div>

				<div className={classnames("form-group", {'has-error': errors.passwordConfirmation})}>
					<label className="control-label">Password Confirmation</label>
					<input
						onChange={this.onChange}
						value={this.state.passwordConfirmation}
						type="password"
						name="passwordConfirmation"
						className="form-control"
					/>
					{errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
				</div>

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
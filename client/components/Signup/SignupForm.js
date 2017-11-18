import React from 'react';
import timezones from '../../data/timezone';
import map from 'lodash/map';

class SignupForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			timeZone: ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit(e) {
		e.preventDefault();
		console.log(this.state);
	}

	render() {
		    const options = map(timezones, (val, key) =>
		      <option key={val} value={val}>{key}</option>
		    );
    		return (
			<form onSubmit={this.onSubmit}>
				<h1>Create an account .. !</h1>
				<div className="form-group">
					<label className="control-label">Username</label>
					<input
						value={this.state.username}
						onChange={this.onChange}
						type="text"
						name="username"
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label className="control-label">Email</label>
					<input
						onChange={this.onChange}
						value={this.state.email}
						type="text"
						name="email"
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label className="control-label">Password</label>
					<input
						onChange={this.onChange}
						value={this.state.password}
						type="password"
						name="password"
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label className="control-label">Password Confirmation</label>
					<input
						onChange={this.onChange}
						value={this.state.passwordConfirmation}
						type="password"
						name="passwordConfirmation"
						className="form-control"
					/>
				</div>

				<div className="form-group">
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
				</div>

				<div className="form-group">
					<button className="btn btn-primary btn-lg">
				 		Sign up
				 	</button>
				</div>
			</form>
		);
	}
} 

export default SignupForm;
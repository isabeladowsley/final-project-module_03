import React, { Component } from 'react';
import axios from 'axios';

class forgotPassword extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			showError: false,
			messageFromServer: '',
			showNullError: false
		};
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};

	sendEmail = async (e) => {
		e.preventDefault();
		const { email } = this.state;
		if (email === '') {
			this.setState({
				showError: false,
				messageFromServer: '',
				showNullError: true
			});
		} else {
			try {
				const response = await axios.post(`${process.env.REACT_APP_API_URL}/forgotPassword`, {
					email
				});
				console.log(response.data);
				if (response.data === 'recovery email sent') {
					this.setState({
						showError: false,
						messageFromServer: 'recovery email sent',
						showNullError: false
					});
				}
			} catch (error) {
				console.error(error.response.data);
				if (error.response.data === 'email not in db') {
					this.setState({
						showError: true,
						messageFromServer: '',
						showNullError: false
					});
				}
			}
		}
	};

	render() {
		const { email, messageFromServer, showNullError, showError } = this.state;

		return (
			<div>
				<form onSubmit={this.sendEmail}>
					<input
						id="email"
						label="email"
						value={email}
						onChange={this.handleChange('email')}
						placeholder="Email Address"
					/>
					<input className="btn btn-green" type="submit" value="Submit" />
				</form>
				{showNullError && (
					<div>
						<p>The email address cannot be null.</p>
					</div>
				)}
				{showError && (
					<div>
						<p>That email address isn&apos;t recognized. Please try again or sign up for a new account.</p>
						<button buttonText="Sign up" href="/signup" />
					</div>
				)}
				{messageFromServer === 'recovery email sent' && (
					<div>
						<h3>Password Reset Email Successfully Sent!</h3>
					</div>
				)}
			</div>
		);
	}
}

export default forgotPassword;

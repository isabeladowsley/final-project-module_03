import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const loading = {
	margin: '1em',
	fontSize: '24px'
};

const title = {
	pageTitle: 'Password Reset Screen'
};

export default class ResetPassword extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: '',
			updated: false,
			isLoading: true,
			error: false
		};
	}

	async componentDidMount() {
		const { match: { params: { token } } } = this.props;
		try {
			const response = await axios.get('http://localhost:5000/api/reset', {
				params: {
					resetPasswordToken: token
				}
			});
			// console.log(response);
			if (response.data.message === 'password reset link a-ok') {
				this.setState({
					username: response.data.username,
					updated: false,
					isLoading: false,
					error: false
				});
			}
		} catch (error) {
			console.log(error.response.data);
			this.setState({
				updated: false,
				isLoading: false,
				error: true
			});
		}
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};

	updatePassword = async (e) => {
		e.preventDefault();
		const { username, password } = this.state;
		const { match: { params: { token } } } = this.props;
		try {
			const response = await axios.put('http://localhost:3003/updatePasswordViaEmail', {
				username,
				password,
				resetPasswordToken: token
			});
			console.log(response.data);
			if (response.data.message === 'password updated') {
				this.setState({
					updated: true,
					error: false
				});
			} else {
				this.setState({
					updated: false,
					error: true
				});
			}
		} catch (error) {
			console.log(error.response.data);
		}
	};

	render() {
		const { password, error, isLoading, updated } = this.state;

		if (error) {
			return (
				<div>
					<div style={loading}>
						<h4>Problem resetting password. Please send another reset link.</h4>
						<a href="/">Go Home </a>
						<a href="/forgotPassword">Forgot Password? </a>
					</div>
				</div>
			);
		}
		if (isLoading) {
			return (
				<div>
					<div title={title} />
					<div style={loading}>Loading User Data...</div>
				</div>
			);
		}
		return (
			<div>
				<div title={title} />
				<form className="password-form" onSubmit={this.updatePassword}>
					<input
						id="password"
						label="password"
						onChange={this.handleChange('password')}
						value={password}
						type="password"
					/>
					<input className="btn btn-green" type="submit" value="Submit" />
				</form>

				{updated && (
					<div>
						<p>Your password has been successfully reset, please try logging in again.</p>
						<Button className="btn btn-green" to="/t">
							<i class="fas fa-home" /> &nbsp; HOME PAGE
						</Button>
					</div>
				)}
			</div>
		);
	}
}

ResetPassword.propTypes = {
	// eslint-disable-next-line react/require-default-props
	match: PropTypes.shape({
		params: PropTypes.shape({
			token: PropTypes.string.isRequired
		})
	})
};

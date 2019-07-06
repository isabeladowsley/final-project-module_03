import React, { Component } from 'react';
import AuthService from './auth/AuthService';
import logo from '../images/logo.png';

export default class Login extends Component {
	state = {
		username: '',
		password: ''
	};

	service = new AuthService();

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const username = this.state.username;
		const password = this.state.password;

		console.log(this.props);

		this.service.login(username, password).then((response) => {
			this.props.setUser(response, () => {
				this.props.history.push('/');
			});
		});
	};

	render() {
		return (
			<div className="login">
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<img className="icon" src={logo} alt="logo" height="150px" />
					<div className="row">
						<i class="fas fa-user" />
						&nbsp;
						<input
							id="username-input"
							className="login-input"
							type="text"
							name="username"
							placeholder="USERNAME"
							value={this.state.username}
							onChange={(e) => this.changeHandler(e)}
						/>
					</div>
					<div className="row">
						<i class="fas fa-key" />
						&nbsp;
						<input
							className="login-input"
							type="password"
							name="password"
							placeholder="PASSWORD"
							value={this.state.password}
							onChange={(e) => this.changeHandler(e)}
						/>
					</div>
					{/* <input type="submit" value="Log in" /> */}
					<button id="btn-login" className="btn btn-green" type="submit">
						<i class="fas fa-user" /> &nbsp; LOG IN
					</button>
				</form>
			</div>
		);
	}
}

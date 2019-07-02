import React, { Component } from 'react';
import NavBar from './Navbar.js';
// import { Button } from 'react-bootstrap';
import AuthService from './auth/AuthService';

import axios from 'axios';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.currentUser._id,
			name: this.props.currentUser.name,
			address: this.props.currentUser.address,
			username: this.props.currentUser.username,
			password: this.props.currentUser.encryptedPassword
		};
		this.changeHandler = this.changeHandler.bind(this);
	}

	authService = new AuthService();

	handleFormSubmit = (event) => {
		const name = this.state.name;
		const address = this.state.address;
		const username = this.state.username;
		const password = this.state.password;

		event.preventDefault();

		axios
			.put(`http://localhost:5000/api/users/${this.state.id}`, { name, address, username, password })
			.then(() => {
				this.props.history.push('/');
			})
			.catch((error) => console.log(error));

		this.authService.signup(password);
	};

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div className="maincontainer">
				<NavBar />
				<div className="maintext">
					<hr />
					<h3>Edit your profile</h3>
					<br />
					<form onSubmit={this.handleFormSubmit}>
						<label>Name:&nbsp; </label>
						<input
							type="text"
							name="name"
							value={this.state.name}
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<br />
						<label>Address:&nbsp; </label>
						<textarea name="address" value={this.state.address} onChange={(e) => this.changeHandler(e)} />
						<br />
						<br />
						<label>Username: &nbsp; </label>
						<textarea name="username" value={this.state.username} onChange={(e) => this.changeHandler(e)} />
						<br />
						<br />
						<input className="btn btn-green" type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
}
export default Profile;

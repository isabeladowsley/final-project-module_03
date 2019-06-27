import React, { Component } from 'react';
import NavBar from './Navbar.js';

import axios from 'axios';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.currentUser._id,
			name: this.props.currentUser.name,
			address: this.props.currentUser.address,
			username: this.props.currentUser.username
		};
		this.changeHandler = this.changeHandler.bind(this);
	}

	handleFormSubmit = (event) => {
		const name = this.state.name;
		const address = this.state.address;
		const username = this.state.username;

		event.preventDefault();

		axios
			.put(`http://localhost:5000/api/users/${this.state.id}`, { name, address, username })
			.then(() => {
				this.props.history.push('/');
			})
			.catch((error) => console.log(error));
	};

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div>
				<NavBar />
				<a className="btn btn-green" href="/">
					Back to your home page
				</a>
				<div>
					<hr />
					<h3>Edit your profile</h3>
					<form onSubmit={this.handleFormSubmit}>
						<label>Name:</label>
						<input
							type="text"
							name="name"
							value={this.state.name}
							onChange={(e) => this.changeHandler(e)}
						/>
						<label>Address:</label>
						<textarea name="address" value={this.state.address} onChange={(e) => this.changeHandler(e)} />
						<label>Username:</label>
						<textarea name="username" value={this.state.username} onChange={(e) => this.changeHandler(e)} />

						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		);
	}
}
export default Profile;

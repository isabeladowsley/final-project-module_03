import React, { Component } from 'react';

import axios from 'axios';

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.currentUser
		};
	}

	handleFormSubmit = (event) => {
		const name = this.state.user.name;
		const address = this.state.user.address;
		const username = this.state.user.username;

		event.preventDefault();

		axios
			.put(`http://localhost:5000/api/users/${this.state.user.id}`, { name, address, username })
			.then(() => {
				this.props.upliftUser(this.state.user);
				this.props.history.push('/');
			})
			.catch((error) => console.log(error));
	};

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			user: { [name]: value }
		});
	};

	render() {
		return (
			<div>
				<hr />
				<h3>Edit your profile</h3>
				<form onSubmit={this.handleFormSubmit}>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={this.state.user.name}
						onChange={(e) => this.changeHandler(e)}
					/>
					<label>Address:</label>
					<textarea name="address" value={this.state.user.address} onChange={(e) => this.changeHandler(e)} />
					<label>Username:</label>
					<textarea
						name="username"
						value={this.state.user.username}
						onChange={(e) => this.changeHandler(e)}
					/>

					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default EditProfile;

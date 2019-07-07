import React, { Component } from 'react';
import NavBar from './Navbar.js';
import AuthService from './auth/AuthService';
import service from '../javascripts/service';
import axios from 'axios';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.currentUser._id,
			name: this.props.currentUser.name,
			address: this.props.currentUser.address,
			username: this.props.currentUser.username,
			// password: this.props.currentUser.encryptedPassword,
			imageUrl: this.props.currentUser.imageUrl
		};
		this.changeHandler = this.changeHandler.bind(this);
	}

	authService = new AuthService();

	handleFormSubmit = (event) => {
		const name = this.state.name;
		const address = this.state.address;
		const username = this.state.username;
		const imageUrl = this.state.imageUrl;

		event.preventDefault();

		axios
			.put(`${process.env.REACT_APP_API_URL}/users/${this.state.id}`, { name, address, username, imageUrl })
			.then(() => {
				this.props.history.push('/');
			})
			.catch((error) => console.log(error));

		// this.authService.signup(password);
	};

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleFileUpload = (e) => {
		console.log('The file to be uploaded is: ', e.target.files[0]);

		const uploadData = new FormData();
		uploadData.append('imageUrl', e.target.files[0]);

		service
			.handleUpload(uploadData)
			.then((response) => {
				console.log('response is: ', response);
				this.setState({ imageUrl: response.secure_url });
			})
			.catch((err) => {
				console.log('Error while uploading the file: ', err);
			});
	};

	render() {
		return (
			<div className="maincontainer">
				<NavBar />
				<div className="maintext">
					<h2>Edit your profile</h2>
					<br />
					<form onSubmit={this.handleFormSubmit}>
						<label className="text-green">Name:&nbsp; </label>
						<input
							className="form-input"
							type="text"
							name="name"
							value={this.state.name}
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<br />
						<label className="text-green">Address:&nbsp; </label>
						<textarea
							className="form-input"
							name="address"
							value={this.state.address}
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<br />
						<label className="text-green">Username: &nbsp; </label>
						<textarea
							className="form-input"
							name="username"
							value={this.state.username}
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<br />
						<label className="text-green">Picture: &nbsp; </label>
						<input type="file" onChange={(e) => this.handleFileUpload(e)} />
						<br />
						<br />
						<input className="btn btn-green" type="submit" value="SUBMIT" />
					</form>
				</div>
			</div>
		);
	}
}
export default Profile;

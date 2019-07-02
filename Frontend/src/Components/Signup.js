import React, { Component } from 'react';
import AuthService from './auth/AuthService';
import service from '../service';

import LocationSearchInput from './LocationSearchInput';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
			geolocation: '',
			username: '',
			password: '',
			imageUrl: '',
			error: '',
			email: ''
		};
		this.setAddress = this.setAddress.bind(this);
		this.setGeo = this.setGeo.bind(this);
	}

	authService = new AuthService();

	// Handlers

	setAddress = (address) => {
		this.setState({ address: address });
	};

	setGeo = (geolocation) => {
		this.setState({ geolocation: geolocation });
	};

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { name, address, geolocation, username, password, imageUrl, email } = this.state;

		this.authService
			.signup(name, address, geolocation, username, password, imageUrl, email)
			.then((response) => {
				console.log('response received', response);
				this.props.history.push('/login');
			})
			.catch((error) => {
				this.setState({
					error: error.response.data.message
				});
				console.log('error caught', error.response.data);
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
			<div>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="name">Full Name</label>
						<input
							type="text"
							className="form-control"
							name="name"
							aria-describedby="name"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="email">Email</label>
						<input
							type="text"
							className="form-control"
							name="email"
							aria-describedby="email"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="username">User Name</label>
						<input
							type="text"
							className="form-control"
							name="username"
							aria-describedby="username"
							onChange={(e) => this.changeHandler(e)}
						/>
						<label htmlFor="password">Password</label>
						<p>Your password must contain one number</p>
						<input
							type="string"
							className="form-control"
							name="password"
							aria-describedby="password"
							onChange={(e) => this.changeHandler(e)}
						/>
						<label htmlFor="picture">Your picture</label>
						<input type="file" onChange={(e) => this.handleFileUpload(e)} />
						<input type="submit" value="Sign up" />
						{this.state.error ? <p>{this.state.error}</p> : ''}
						<p>Please, enter your address</p>
						<LocationSearchInput setAddress={this.setAddress} setGeo={this.setGeo} />
					</div>
				</form>
			</div>
		);
	}
}

export default Signup;

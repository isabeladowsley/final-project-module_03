import React, { Component } from 'react';
import AuthService from './auth/AuthService';
import service from '../service';
import LocationSearchInput from './LocationSearchInput';
import MapContainer from './MapContainer';

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
			<div className="signup">
				<form onSubmit={(e) => this.handleSubmit(e)}>
					{/* <div className="row"> */}
					<input
						type="text"
						className="signup-input"
						name="name"
						aria-describedby="name"
						placeholder="FULL NAME"
						onChange={(e) => this.changeHandler(e)}
					/>
					<br />
					<input
						type="text"
						className="signup-input"
						name="email"
						aria-describedby="email"
						placeholder="EMAIL"
						onChange={(e) => this.changeHandler(e)}
					/>
					&nbsp; &nbsp; &nbsp;
					<br />
					<input
						type="text"
						className="signup-input"
						name="username"
						aria-describedby="username"
						placeholder="USERNAME"
						onChange={(e) => this.changeHandler(e)}
					/>
					<p> Your password must contain one number</p>
					<input
						type="string"
						className="signup-input"
						name="password"
						aria-describedby="password"
						placeholder="PASSWORD"
						onChange={(e) => this.changeHandler(e)}
					/>
					<br />
					&nbsp; <p>Your picture</p>
					<input type="file" onChange={(e) => this.handleFileUpload(e)} />
					{this.state.error ? <p>{this.state.error}</p> : ''}
					<p>Please, enter your address</p>
					<LocationSearchInput setAddress={this.setAddress} setGeo={this.setGeo} />
					<button className="btn btn-green" type="submit">
						<i class="fas fa-sign-out-alt" /> &nbsp; SIGN UP
					</button>
				</form>
			</div>
		);
	}
}

export default Signup;

import React, { Component } from 'react';
// import fromAddress from '../javascripts/geocode';
import AuthService from './auth/AuthService';

import service from '../service';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			street: '',
			city: '',
			country: '',
			zipcode: '',
			geolocation: [],
			username: '',
			password: '',
			imageUrl: '',
			error: ''
		};
	}

	authService = new AuthService();

	// geocode = () => {
	// 	// const lat = fromAddress(this.state.street);
	// 	// const lng = fromAddress(this.state.street);
	// 	const completeGeo = fromAddress(this.state.street);
	// 	this.setState({
	// 		geolocation: completeGeo
	// 	});
	// };

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		// this.geocode();

		const { name, street, city, country, zipcode, username, password, imageUrl } = this.state;

		this.authService
			.signup(name, street, city, country, zipcode, username, password, imageUrl)
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
				// after the console.log we can see that response carries 'secure_url' which we can use to update the state
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
						<label htmlFor="street">Street and House Number</label>
						<input
							type="text"
							className="form-control"
							name="street"
							aria-describedby="street"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="city">City</label>
						<input
							type="text"
							className="form-control"
							name="city"
							aria-describedby="city"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="country">Country</label>
						<input
							type="text"
							className="form-control"
							name="country"
							aria-describedby="country"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="zip-code">Zip Code</label>
						<input
							type="text"
							className="form-control"
							name="zipcode"
							aria-describedby="zipcode"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
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
					</div>
				</form>
			</div>
		);
	}
}

export default Signup;

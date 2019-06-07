import React, { Component } from 'react';
// import fromAddress from '../javascripts/geocode';
import AuthService from './auth/AuthService';
// import { Redirect } from 'react-router-dom';

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
			password: ''
		};
		this.service = new AuthService();
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
			[name]: value,
			error: false
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		// this.geocode();

		const name = this.state.name;
		const street = this.state.street;
		const city = this.state.city;
		const country = this.state.country;
		const zipcode = this.state.zipcode;
		const geolocation = this.state.geolocation;
		const username = this.state.username;
		const password = this.state.password;

		this.authService
			.signup(name, street, city, country, zipcode, geolocation, username, password)
			.then((response) => {
				console.log(response);
				console.log(this.props.history);
				this.props.history.push('/login');
			})
			.catch((err) => {
				this.setState({
					error: true
				});
				console.log(err);
			});
	};

	render() {
		if (this.state.error) {
			return <p>{}</p>;
		}
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
						<label htmlFor="name">Street and House Number</label>
						<input
							type="text"
							className="form-control"
							name="street"
							aria-describedby="street"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="name">City</label>
						<input
							type="text"
							className="form-control"
							name="city"
							aria-describedby="city"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="name">Country</label>
						<input
							type="text"
							className="form-control"
							name="country"
							aria-describedby="country"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="name">Zip Code</label>
						<input
							type="text"
							className="form-control"
							name="zipcode"
							aria-describedby="zipcode"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<br />
						<label htmlFor="name">User Name</label>
						<input
							type="text"
							className="form-control"
							name="username"
							aria-describedby="username"
							onChange={(e) => this.changeHandler(e)}
						/>
						<label htmlFor="name">Password</label>
						<input
							type="string"
							className="form-control"
							name="password"
							aria-describedby="password"
							onChange={(e) => this.changeHandler(e)}
						/>
						<input type="submit" value="signup" />
					</div>
				</form>
			</div>
		);
	}
}

export default Signup;

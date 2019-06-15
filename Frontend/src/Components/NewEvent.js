import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

class NewEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			date: '',
			address: '',
			city: '',
			country: '',
			description: '',
			author: this.props.currentUser
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { name, date, address, city, country, description, author } = this.state;
		axios
			.post('http://localhost:5000/api/new-event', { name, date, address, city, country, description, author })
			.then(() => {
				this.setState({
					name: '',
					date: '',
					address: '',
					city: '',
					country: '',
					description: ''
				});

				Swal.fire('Your event was submitted!');
				this.props.history.push('/');
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<div>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="name">Event's name</label>
						<input
							type="text"
							className="form-control"
							name="name"
							aria-describedby="name"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="name">Date</label>
						<input
							type="date"
							className="form-control"
							name="date"
							aria-describedby="date"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="address">Address</label>
						<input
							type="text"
							className="form-control"
							name="address"
							aria-describedby="address"
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
						<label htmlFor="description">Tell us more about it</label>
						<textarea
							className="form-control"
							name="description"
							rows="5"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />

						<input type="submit" value="Save!" />
					</div>
				</form>
			</div>
		);
	}
}

export default NewEvent;

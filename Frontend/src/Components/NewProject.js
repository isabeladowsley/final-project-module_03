import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MapContainer from './MapContainer';

class NewProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
			geolocation: '',
			description: '',
			author: this.props.currentUser
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setAddress = this.setAddress.bind(this);
		this.setGeo = this.setGeo.bind(this);
	}

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

		const { name, address, geolocation, description, author } = this.state;
		axios
			.post('http://localhost:5000/api/new-project', { name, address, geolocation, description, author })
			.then(() => {
				this.setState({
					name: '',
					address: '',
					geolocation: '',
					description: ''
				});
				Swal.fire('Your project was submitted!');
				this.props.history.push('/');
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<div>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="name">Project's name</label>
						<input
							type="text"
							className="form-control"
							name="name"
							aria-describedby="name"
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
						<input type="submit" value="Save the project!" />
						<MapContainer setAddress={this.setAddress} setGeo={this.setGeo} />
					</div>
				</form>
			</div>
		);
	}
}

export default NewProject;

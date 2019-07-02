import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MapContainer from './MapContainer';
import LocationSearchInput from './LocationSearchInput';
import NavBar from './Navbar';
import { Button } from 'react-bootstrap';

import TimePicker from 'react-gradient-timepicker';
// import TimeField from 'react-simple-timefield';

class NewEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
			date: '',
			time: '',
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

		const { name, date, time, address, geolocation, description, author } = this.state;
		axios
			.post('http://localhost:5000/api/new-event', {
				name,
				date,
				time,
				address,
				geolocation,
				description,
				author
			})
			.then(() => {
				this.setState({
					name: '',
					date: '',
					time: '',
					address: '',
					geolocation: '',
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
				<NavBar handleLogout={this.props.handleLogout} />
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
						<label htmlFor="date">Date</label>
						<input
							type="date"
							className="form-control"
							name="date"
							aria-describedby="date"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="time">Starting time</label>
						<input
							type="time"
							className="form-control"
							name="time"
							aria-describedby="time"
							onChange={(e) => this.changeHandler(e)}
						/>
						{/* // <TimePicker
						// 	name="time"
						// 	time="01:00"
						// 	theme="Bourbon"
						// 	className="timepicker"
						// 	placeholder="Start Time"
						// 	onSet={(val) => {
						// 		alert('val:' + val.format12);
						// 	}}
						// /> */}

						<br />
						<label htmlFor="description">Tell us more about it</label>
						<textarea
							className="form-control"
							name="description"
							rows="5"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />

						<Button className="btn" variant="info" type="submit">
							Save the event
						</Button>
						<Button className="btn" variant="info" href="/">
							Go back to your page
						</Button>
						<LocationSearchInput setAddress={this.setAddress} setGeo={this.setGeo} />

						<MapContainer
							currentUser={this.state.author}
							setAddress={this.setAddress}
							setGeo={this.setGeo}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default NewEvent;

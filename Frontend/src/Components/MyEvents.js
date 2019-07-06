import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Card } from 'react-bootstrap';
import NavBar from './Navbar.js';

var moment = require('moment');

class MyEvents extends Component {
	delete = (id) => {
		axios
			.delete(`${process.env.REACT_APP_API_URL}/my-events/${id}`)
			.then(Swal.fire('Your event was deleted!'))
			.catch((err) => console.log(err));
		window.location.reload();
	};

	formattedDate(date) {
		var formattedDate = moment(date).format('DD MMMM YYYY');
		return formattedDate;
	}

	render() {
		return (
			<div className="maincontainer">
				<NavBar handleLogout={this.props.handleLogout} />
				<div className="flex-row-3">
					{this.props.currentUser.events.map((event, index) => (
						<div className="card flex-row-3-child" key={index}>
							<img className="card-image" src={event.image_url} alt="" height="200px" />
							<h2 className="card-title">Event name: {event.name}</h2>
							<p className="card-text">Date: {this.formattedDate(event.date)}</p>
							<p className="card-text">Adrress: {event.address}</p>
							<p className="card-text">Description: {event.description}</p>
							<button className="btn-card btn-purple" onClick={() => this.delete(event._id)}>
								DELETE THE EVENT
							</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default MyEvents;

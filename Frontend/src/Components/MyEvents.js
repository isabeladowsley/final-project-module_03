import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Card } from 'react-bootstrap';

class MyEvents extends Component {
	delete = (id) => {
		axios
			.delete(`http://localhost:5000/api/my-events/${id}`)
			.then(Swal.fire('Your event was deleted!'))
			.catch((err) => console.log(err));
		window.location.reload();
	};

	render() {
		return (
			<div>
				{this.props.currentUser.events.map((event, index) => (
					<Card className="card" key={index}>
						<Card.Img variant="top" src="holder.js/100px180" />
						<Card.Body>
							<Card.Title>Event name: {event.name}</Card.Title>
							{/* <Card.Text>Created by : {event.author.name}</Card.Text> */}
							<Card.Text>Date: {event.date}</Card.Text>
							<Card.Text>Adrress: {event.address}</Card.Text>
							<Card.Text>Description: {event.description}</Card.Text>
							<button className="btn btn-purple" onClick={() => this.delete(event._id)}>
								Delete the event
							</button>
						</Card.Body>
					</Card>
				))}
			</div>
		);
	}
}

export default MyEvents;

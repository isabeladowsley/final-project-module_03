import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import axios from 'axios';

class AllEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allevents: [],
			user: this.props.currentUser
		};
	}

	redirect = (id) => {
		this.props.history.push(`/allevents/${id}`);
	};

	componentDidMount() {
		fetch('http://localhost:5000/api/allevents')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				this.setState({ allevents: data });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="flex-row-3">
				{this.state.allevents.map((event, index) => (
					<div className="card flex-row-3-child" key={index}>
						<img className="card-image" src={event.image_url} alt="" height="200px" />
						<br />
						<h2 className="card-title">{event.name} </h2>
						<br />
						<p className="card-text">Created by : {event.author.name}</p>
						<br />
						<p className="card-text">Address: {event.address}</p>
						<br />
						<p className="card-text">Day: {event.date}</p>
						<br />
						<p className="card-text">Time: {event.time}</p>
						<br />
						<Button className="btn btn-purple" onClick={() => this.redirect(event._id)}>
							SEE MORE
						</Button>
					</div>
				))}
			</div>
		);
	}
}

export default AllEvents;

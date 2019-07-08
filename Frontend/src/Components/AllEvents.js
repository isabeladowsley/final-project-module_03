import React, { Component } from 'react';

import NavBar from './Navbar.js';
import axios from 'axios';

var moment = require('moment');

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
		fetch(`${process.env.REACT_APP_API_URL}/getevents`, { credentials: 'include' })
			.then((response) => {
				console.log(response);
				if (!response.ok) {
					this.setState({ allevents: null });
					throw new Error({ message: 'problem fetching data from db' });
				}
				response.json().then((events) => {
					this.setState({ allevents: events });
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	formattedDate(date) {
		var formattedDate = moment(date).format('DD MMMM YYYY');
		return formattedDate;
	}

	splitComments(comments) {
		var splitted = comments;
		return splitted.split;
	}

	countAtendees(atendees) {
		var countAtendees = atendees;
		return countAtendees.length;
	}

	render() {
		return (
			<div className="maincontainer">
				<NavBar handleLogout={this.props.handleLogout} />

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
							<p className="card-text">Day: {this.formattedDate(event.date)}</p>
							<br />
							<p className="card-text">Time: {event.time}</p>
							<br />
							<p className="card-text">Comments: </p>

							{event.comments.map((comment, index) => <p key={index}>{comment}</p>)}
							<br />
							<p className="card-text">
								{' '}
								<i class="fas fa-users" /> &nbsp;
								{this.countAtendees(event.atendees)} persons have already confirmed!
							</p>
							<button className="btn-purple btn-card" onClick={() => this.redirect(event._id)}>
								SEE MORE
							</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default AllEvents;

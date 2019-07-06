import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './Navbar.js';

var moment = require('moment');

class Event extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: '',
			isGoing: true,
			comment: '',
			user: this.props.currentUser,
			author: '',
			atendees: []
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.getSingleEvent = this.getSingleEvent.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleCheckboxChange = (event) => {
		const atendees = this.state.atendees;
		// console.log(atendees);
		if (atendees.includes(this.state.user._id)) {
			Swal.fire('Your presence is already confirmed');
			this.setState({ isGoing: false });
		} else {
			this.setState({ isGoing: event.target.checked });
		}
	};

	componentDidMount() {
		this.getSingleEvent();
	}

	getSingleEvent = () => {
		const { params } = this.props.match;
		axios
			.get(`http://localhost:5000/api/allevents/${params.id}`)
			.then((responseFromApi) => {
				const theEvent = responseFromApi.data;
				this.setState({ event: theEvent, author: theEvent.author.name, atendees: theEvent.atendees });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleFormSubmit = (e) => {
		e.preventDefault();
		const { event, isGoing, comment, user } = this.state;
		axios.put(`http://localhost:5000/api/allevents/${this.state.event._id}`, { event, isGoing, comment, user });

		Swal.fire('Thanks for your info');
		this.props.history.push('/allevents');
	};

	render() {
		const formattedDate = moment(this.state.event.date).format('DD MMMM YYYY');

		const countAtendees = this.state.atendees.length;

		return (
			<div className="maincontainer">
				<NavBar handleLogout={this.props.handleLogout} />
				<form onSubmit={this.handleFormSubmit}>
					<img className="card-image" src={this.state.event.image_url} alt="" height="200px" />
					<br />
					<h2 className="text-purple">{this.state.event.name} </h2>
					<br />
					<h3 className="text-green">
						Created by : <span className="text-white">{this.state.author}</span>
					</h3>
					<br />
					<h3 className="text-green">
						Address: <span className="text-white">{this.state.event.address}</span>
					</h3>
					<br />
					<h3 className="text-green">
						Day: <span className="text-white">{formattedDate}</span>
					</h3>
					<br />
					<h3 className="text-green">
						Time: <span className="text-white">{this.state.event.time}</span>
					</h3>
					<br />
					<h3 className="text-green">
						Description: <span className="text-white">{this.state.event.description}</span>
					</h3>
					<br />
					<p> {countAtendees} people have already confirmed!</p>
					<h3 className="text-green">Are you coming: </h3>
					<input
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleCheckboxChange}
					/>
					<br />
					<h3 className="text-green">Leave a comment </h3>
					<textarea className="form-control" name="comment" rows="5" onChange={this.changeHandler} />
					<input className="btn btn-green" type="submit" value="SUBMIT YOUR CHANGES" />
				</form>
			</div>
		);
	}
}

export default Event;

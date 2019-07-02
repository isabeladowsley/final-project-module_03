import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

class Event extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: '',
			isGoing: true,
			user: this.props.curentUser
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			event: {
				[name]: value
			}
		});

		if (this.state.isGoing === true) {
			this.state.event.atendees.push(this.state.user.id);
		}
	}

	componentDidMount() {
		this.getSingleProject();
	}

	getSingleEvent = () => {
		const { params } = this.props.match;
		axios
			.get(`http://localhost:5000/api/allevents/${params.id}`)
			.then((responseFromApi) => {
				const theEvent = responseFromApi.data;
				this.setState({ event: theEvent });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { event } = this.state;
		axios
			.put('http://localhost:5000/api/allevents/:id', {
				event
			})
			.then(() => {
				this.setState({
					event: ''
				});
				Swal.fire('Thanks for your info');
				this.props.history.push('/allevents');
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<div>
				<img className="card-image" src={this.state.event.image_url} alt="" height="200px" />
				<br />
				<h2 className="card-title">{this.state.event.name} </h2>
				<br />
				<p className="card-text">Created by : {this.state.event.author.name}</p>
				<br />
				<p className="card-text">Address: {this.state.event.address}</p>
				<br />
				<p className="card-text">Day: {this.state.event.date}</p>
				<br />
				<p className="card-text">Time: {this.state.event.time}</p>
				<br />
				<p className="card-text">Description: {this.state.event.description}</p>
				<div className="flex-row">
					<p className="card-text">Are you coming: </p>
					<input
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleInputChange}
					/>
				</div>
				<label>Leave a comment </label>
				<textarea className="form-control" name="description" rows="5" onChange={this.handleInputChange} />
				<input className="btn btn-green" type="submit" value="Submit" />
			</div>
		);
	}
}

export default Event;

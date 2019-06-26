import React, { Component } from 'react';
import NavBar from './Navbar.js';
import MapContainer from './MapContainer.js';

class Mypage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.currentUser
		};
	}

	render() {
		return (
			<div>
				<NavBar handleLogout={this.props.handleLogout} />

				<a className="btn btn-green" href="/new-project">
					Add a project
				</a>
				<a className="btn btn-green" href="/new-event">
					Add an event
				</a>

				<div>
					<h1>Welcome back, {this.state.user.name}</h1>
					<img src={this.state.user.imageUrl} alt="user_picture" height="150px" />
				</div>

				<MapContainer currentUser={this.state.user} />
			</div>
		);
	}
}

export default Mypage;

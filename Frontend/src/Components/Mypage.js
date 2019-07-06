import React, { Component } from 'react';
import NavBar from './Navbar.js';
import MapContainer from './MapContainer.js';

import ChatApp from './Chat/ChatApp.js';

class Mypage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.currentUser
		};
		this.changeView = this.changeView.bind(this);
	}

	changeView(view) {
		this.setState({
			currentView: view
		});
	}

	render() {
		return (
			<div className="maincontainer">
				<NavBar handleLogout={this.props.handleLogout} />
				<div>
					<a className="btn btn-green" href="/new-project">
						<i className="fas fa-plus" /> &nbsp; ADD A PROJECT
					</a>

					<a className="btn btn-green" href="/new-event">
						<i className="fas fa-plus" /> &nbsp; ADD AN EVENT
					</a>

					<br />
					<br />
					<br />
					<div className="flex-row">
						<h1>Welcome back, {this.state.user.name}</h1>

						<img id="profile_img" src={this.state.user.imageUrl} alt="user_picture" width="100px" />
					</div>
					<br />
					<br />
					<h2>Discover what is happening close to you!</h2>
					<MapContainer currentUser={this.state.user} />
					<ChatApp currentUser={this.state.user} />
				</div>
			</div>
		);
	}
}

export default Mypage;

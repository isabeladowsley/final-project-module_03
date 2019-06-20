import React, { Component } from 'react';
import NavBar from './Navbar.js';
import { Link } from 'react-router-dom';

class Mypage extends Component {
	state = {
		user: this.props.currentUser
	};

	render() {
		return (
			<div>
				<NavBar handleLogout={this.props.handleLogout} />
				<Link to="/new-project">Add a project</Link>
				<Link to="/new-event">Add an event</Link>
				<h1>Welcome back, {this.state.user.name}</h1>
				<img src={this.state.user.imageUrl} alt="user_picture" height="150px" />
				<div />
			</div>
		);
	}
}

export default Mypage;

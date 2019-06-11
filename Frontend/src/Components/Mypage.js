import React, { Component } from 'react';
import NavBar from './Navbar.js';
import { Link } from 'react-router-dom';

class Mypage extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<Link to="/new-project">Add a project</Link>
				<Link to="/new-event">Add an event</Link>
				<h1>Welcome back, {this.props.currentUser.name}</h1>
			</div>
		);
	}
}

export default Mypage;

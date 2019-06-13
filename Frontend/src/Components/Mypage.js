import React, { Component } from 'react';
import NavBar from './Navbar.js';
import { Link } from 'react-router-dom';

class Mypage extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	// componentDidMount() {
	// 	this.props.stopRedirect();
	// }

	render() {
		return (
			<div>
				<NavBar />
				<Link to="/new-project">Add a project</Link>
				<Link to="/new-event">Add an event</Link>
				<h1>Welcome back, {this.props.currentUser.name}</h1>
				<img src={this.props.currentUser.imageUrl} alt="user_picture" height="150px" />
			</div>
		);
	}
}

export default Mypage;

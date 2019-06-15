import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import AuthService from './auth/AuthService';

class NavBar extends Component {
	// state = {
	// 	user: [ this.props.currentUser ]
	// };

	render() {
		// if (this.state.user == null) {
		// 	return <Redirect to="/login" />;
		// }

		return (
			<div>
				<pre>{this.state}</pre>
				<Navbar bg="dark">
					<ul>
						<Link to="/profile">Your profile</Link>
						<Link to="/projects">Your projects</Link>
						<Link to="/neighborhood">My neighborhood</Link>
						<Link to="/profile">My Complaints</Link>
					</ul>
					<button onClick={this.props.handleLogout}>Logout</button>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;

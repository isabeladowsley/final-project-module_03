import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

class NavBar extends Component {
	render() {
		return (
			<div>
				<Navbar bg="dark">
					<ul>
						<Link to="/profile">Your profile</Link>
						<Link to="/projects">Your projects</Link>
						<Link to="/neighborhood">My neighborhood</Link>
						<Link to="/profile">My Complaints</Link>
					</ul>
					<button>Log Out</button>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;

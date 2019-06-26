import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

class NavBar extends Component {
	render() {
		return (
			<div>
				<Navbar className="navbar">
					<ul>
						<a className="btn btn-purple" href="/profile">
							My profile
						</a>
						<a className="btn btn-purple" href="/my-projects">
							My projects
						</a>
						<a className="btn btn-purple" href="/my-events">
							My events
						</a>
					</ul>
					<button className="btn btn-green" onClick={this.props.handleLogout}>
						Log-out
					</button>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;

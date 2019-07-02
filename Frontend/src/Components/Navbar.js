import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

class NavBar extends Component {
	render() {
		return (
			<div>
				<Navbar className="sidebar">
					<Button className="btn btn-green" to="/t">
						<i className="fas fa-home" /> &nbsp; HOME PAGE
					</Button>
					<ul>
						<a className="btn btn-purple" href="/profile">
							Edit your profile
						</a>
						<a className="btn btn-purple" href="/my-projects">
							My projects
						</a>
						<a className="btn btn-purple" href="/my-events">
							My events
						</a>

						<a className="btn btn-purple" href="/allprojects">
							All projects
						</a>
						<a className="btn btn-purple" href="/allevents">
							All events
						</a>
					</ul>
					<button className="btn btn-green" onClick={this.props.handleLogout}>
						LOG OUT
					</button>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;

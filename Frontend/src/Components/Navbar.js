import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

class NavBar extends Component {
	render() {
		return (
			<div>
				<Navbar className="sidebar">
					<a className="btn btn-green" href="/">
						<i className="fas fa-home" /> &nbsp; HOME PAGE
					</a>
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
						<i className="fas fa-sign-out-alt" /> &nbsp; LOG OUT
					</button>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;

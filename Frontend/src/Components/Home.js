import React, { Component } from 'react';
import logo from '../images/logo.png';
import { Button } from 'react-bootstrap';

class Home extends Component {
	render() {
		return (
			<div>
				<img className="logo" src={logo} alt="logo" height="500px" />
				<div className="acess1">
					<Button className="btn" variant="info" href="/signup">
						Sign-up
					</Button>
					<Button className="btn" variant="info" href="/login">
						Log-in
					</Button>
				</div>
				<h5> _____ OR ______</h5>
				<div className="acess2">
					<Button>Continue with Facebook</Button>
					<Button>Continue with Instagram</Button>
				</div>
			</div>
		);
	}
}

export default Home;

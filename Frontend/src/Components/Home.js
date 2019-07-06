import React, { Component } from 'react';
import logo from '../images/logo.png';

class Home extends Component {
	render() {
		return (
			<div>
				<img className="logo" src={logo} alt="logo" height="500px" />
				<div className="acess1">
					<a className="btn btn-purple" variant="info" href="/signup">
						Sign-up
					</a>
					<a className="btn btn-purple" variant="info" href="/login">
						Log-in
					</a>
					<a href="/forgotPassword">Forgot your password?</a>
				</div>
			</div>
		);
	}
}

export default Home;

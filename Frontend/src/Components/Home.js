import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
	render() {
		return (
			<div>
				<div>
					<div className="acess1">
						<Link to="/signup">Sign-up</Link>
						<Link to="/login">Log-in</Link>
					</div>
					<h5> _____ OR ______</h5>
					<div className="acess2">
						<Link>Continue with Facebook</Link>
						<Link>Continue with Instagram</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

import React, { Component } from 'react';
import NavBar from './Navbar.js';
import MapContainer from './MapContainer.js';
import ChatMessage from './ChatMessage.js';
import { Button } from 'react-bootstrap';

// import { default as Chatkit } from '@pusher/chatkit-server';

// const chatkit = new Chatkit({
// 	instanceLocator: process.env.REACT_APP_INSTANCE_LOCATOR,
// 	key: process.env.REACT_APP_SECRET_KEY
// });

class Mypage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.currentUser
			// currentView: 'ChatMessage'
		};
		this.changeView = this.changeView.bind(this);
	}

	changeView(view) {
		this.setState({
			currentView: view
		});
	}

	render() {
		let view = '';
		if (this.state.currentView === 'ChatMessage') {
			view = <ChatMessage changeView={this.changeView} />;
		}

		return (
			<div className="maincontainer">
				<NavBar handleLogout={this.props.handleLogout} />
				<div>
					<Button className="btn btn-green" href="/new-project">
						<i class="fas fa-plus" /> &nbsp; ADD A PROJECT
					</Button>

					<Button className="btn btn-green" href="/new-event">
						<i class="fas fa-plus" /> &nbsp; ADD AN EVENT
					</Button>

					<br />
					<br />
					<br />
					<div className="flex-row">
						<h1>Welcome back, {this.state.user.name}</h1>

						<img id="profile_img" src={this.state.user.imageUrl} alt="user_picture" width="100px" />
					</div>
					<br />
					<br />
					<h2>Discover what is happening close to you!</h2>
					<MapContainer currentUser={this.state.user} />
					{/* <Chatapp currentUser={this.state.user} /> */}
				</div>
			</div>
		);
	}
}

export default Mypage;

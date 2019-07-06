import React, { Component } from 'react';
import ChatMessage from './ChatMessage.js';
import ChatSignup from './ChatSignup.js';
import ChatBox from './ChatBox.js';

const Chatkit = require('@pusher/chatkit-server');

// console.log('testing ', env.REACT_APP_INSTANCE_LOCATOR);

const chatkit = new Chatkit.default({
	instanceLocator: 'v1:us1:5edd25d8-664f-425e-93f9-4603c0d9431f',
	key: '351556d8-4ba7-4e4b-8ea1-6ac81d417760:NsaR4PuSLGg4+G82UuGfM44xFsdtLgfce5WeiEpzMMU='
});

class ChatApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUsername: '',
			currentId: '',
			currentView: 'ChatMessage'
		};
		this.changeView = this.changeView.bind(this);
		this.createUser = this.createUser.bind(this);
	}

	createUser(username) {
		chatkit
			.createUser({
				id: username,
				name: username
			})
			.then((currentUser) => {
				this.setState({
					currentUsername: username,
					currentId: username,
					currentView: 'chatBox'
				});
			})
			.catch((err) => {
				if (err.status === 400) {
					this.setState({
						currentUsername: username,
						currentId: username,
						currentView: 'chatBox'
					});
				} else {
					console.log(err.status);
				}
			});
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
		} else if (this.state.currentView === 'signup') {
			view = <ChatSignup onSubmit={this.createUser} />;
		} else if (this.state.currentView === 'chatBox') {
			view = <ChatBox currentId={this.state.currentId} />;
		}
		return <div className="ChatApp">{view}</div>;
	}
}
export default ChatApp;
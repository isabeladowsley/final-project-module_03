import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Input from './Input';
import MessageList from './MessageList';

class ChatBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			currentRoom: { users: [] },
			messages: [],
			users: []
		};
		this.addMessage = this.addMessage.bind(this);
	}

	componentDidMount() {
		const chatManager = new ChatManager({
			instanceLocator: 'v1:us1:5edd25d8-664f-425e-93f9-4603c0d9431f',
			userId: this.props.currentId,
			tokenProvider: new TokenProvider({
				url:
					'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/5edd25d8-664f-425e-93f9-4603c0d9431f/token'
			})
		});

		chatManager
			.connect()
			.then((currentUser) => {
				this.setState({ currentUser: currentUser });
				return currentUser.subscribeToRoom({
					roomId: '31246603',
					messageLimit: 100,
					hooks: {
						onMessage: (message) => {
							this.setState({
								messages: [ ...this.state.messages, message ]
							});
						}
					}
				});
			})
			.then((currentRoom) => {
				this.setState({
					currentRoom,
					users: currentRoom.userIds
				});
			})
			.catch((error) => console.log(error));
	}

	addMessage(text) {
		this.state.currentUser
			.sendMessage({
				text,
				roomId: this.state.currentRoom.id
			})
			.catch((error) => console.error('error', error));
	}

	render() {
		return (
			<div>
				<h3 className="header">Hi There!</h3>
				<MessageList messages={this.state.messages} />
				<Input className="input" onSubmit={this.addMessage} />
			</div>
		);
	}
}

export default ChatBox;

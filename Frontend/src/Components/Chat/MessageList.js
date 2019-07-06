import React, { Component } from 'react';

class MessageList extends Component {
	render() {
		return (
			<ul className="message-list">
				{this.props.messages.map((message, index) => (
					<li key={index}>
						<p className="message-sender">{message.senderId}</p>
						<h4 className="message-text">{message.text}</h4>
					</li>
				))}
				<li />
			</ul>
		);
	}
}
export default MessageList;

import React, { Component } from 'react';
class ChatMessage extends Component {
	constructor(props) {
		super(props);
		this.changeView = this.changeView.bind(this);
	}
	changeView() {
		this.props.changeView('signup');
	}
	render() {
		return (
			<div>
				<button className="chat-button" onClick={this.changeView}>
					<i className="fas fa-comments" /> CHAT
				</button>
			</div>
		);
	}
}
export default ChatMessage;

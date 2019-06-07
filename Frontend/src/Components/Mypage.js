import React, { Component } from 'react';

class Mypage extends Component {
	render() {
		console.log(this.props.currentUser);
		return (
			<div>
				<h1>Welcome back, {this.props.currentUser.name}</h1>
			</div>
		);
	}
}

export default Mypage;

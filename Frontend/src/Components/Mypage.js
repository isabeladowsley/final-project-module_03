import React, { Component } from 'react';
import NavBar from './Navbar.js';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

class Mypage extends Component {
	state = {
		user: this.props.currentUser
	};

	render() {
		return (
			<div>
				<NavBar handleLogout={this.props.handleLogout} />
				<Link to="/new-project">Add a project</Link>
				<Link to="/new-event">Add an event</Link>
				<div>
					<h1>Welcome back, {this.state.user.name}</h1>
					<img src={this.state.user.imageUrl} alt="user_picture" height="150px" />
				</div>
				{this.state.user.projects.map((project) => (
					<Card style={{ width: '18rem' }}>
						<Card.Img variant="top" src="holder.js/100px180" />
						<Card.Body>
							<Card.Title>{project.name}</Card.Title>
							<Card.Text>{project.author.name}</Card.Text>
							<Card.Text>{project.description}</Card.Text>
							<Button variant="primary">Go somewhere</Button>
						</Card.Body>
					</Card>
				))}
				<div />
			</div>
		);
	}
}

export default Mypage;

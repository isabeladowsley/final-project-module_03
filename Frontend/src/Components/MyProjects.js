import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Card } from 'react-bootstrap';

class MyProjects extends Component {
	delete = (id) => {
		axios
			.delete(`http://localhost:5000/api/my-projects/${id}`)
			.then(Swal.fire('Your project was deleted!'))
			.catch((err) => console.log(err));
		// this.props.history.push('/');
		window.location.reload();
	};

	render() {
		return (
			<div>
				{this.props.currentUser.projects.map((project, index) => (
					<Card className="card" key={index}>
						<Card.Img variant="top" src="holder.js/100px180" />
						<Card.Body>
							<Card.Title>{project.name}</Card.Title>
							{/* <Card.Text>Created by : {project.author.name}</Card.Text> */}
							<Card.Text>{project.address}</Card.Text>
							<Card.Text>{project.description}</Card.Text>
							<button className="btn btn-purple" onClick={() => this.delete(project._id)}>
								Delete the project
							</button>
						</Card.Body>
					</Card>
				))}
			</div>
		);
	}
}

export default MyProjects;

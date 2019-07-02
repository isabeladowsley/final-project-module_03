import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { Card, Button } from 'react-bootstrap';

class MyProjects extends Component {
	delete = (id) => {
		axios
			.delete(`http://localhost:5000/api/allprojects/${id}`)
			.then(Swal.fire('Your project was deleted!'))
			.catch((err) => console.log(err));
		this.props.history.push('/my-projects');
		// window.location.reload();
	};

	render() {
		return (
			<div className="flex-row-3">
				{this.props.currentUser.projects.map((project, index) => (
					<div className="card flex-row-3-child" key={index}>
						<img className="card-image" src={project.image_url} alt="" height="200px" />
						<br />
						<h2 className="card-title">{project.name} </h2>
						<br />
						<p className="card-text">Address: {project.address}</p>
						<br />
						<p className="card-text">Description: {project.description}</p>
						<button className="btn btn-purple" onClick={() => this.delete(project._id)}>
							Delete the project
						</button>
					</div>
				))}
			</div>
		);
	}
}

export default MyProjects;

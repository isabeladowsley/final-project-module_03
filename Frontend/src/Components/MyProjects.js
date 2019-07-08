import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import NavBar from './Navbar.js';

class MyProjects extends Component {
	delete = (id) => {
		axios
			.delete(`${process.env.REACT_APP_API_URL}/allprojects/${id}`)
			.then(Swal.fire('Your project was deleted!'))
			.catch((err) => console.log(err));
		this.props.history.push('/my-projects');
		// window.location.reload();
	};

	redirect = (id) => {
		this.props.history.push(`/allprojects/${id}`);
	};

	render() {
		return (
			<div className="maincontainer">
				<NavBar handleLogout={this.props.handleLogout} />
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
							<p className="card-text">Comments: </p>
							{project.comments.map((comment, index) => <p key={index}>{comment}</p>)}
							<button className="btn-purple btn-card" onClick={() => this.redirect(project._id)}>
								SEE MORE
							</button>
							<button className="btn-card btn-purple" onClick={() => this.delete(project._id)}>
								DELETE THE PROJECT
							</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default MyProjects;

import React, { Component } from 'react';

import NavBar from './Navbar.js';

import axios from 'axios';

class AllProjects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allprojects: []
		};
	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API_URL}/allprojects`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				this.setState({ allprojects: data });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	redirect = (id) => {
		this.props.history.push(`/allprojects/${id}`);
	};

	render() {
		return (
			<div className="maincontainer">
				<NavBar handleLogout={this.props.handleLogout} />
				<div className="flex-row-3">
					{this.state.allprojects.map((project, index) => (
						<div className="card flex-row-3-child" key={index}>
							<img className="card-image" src={project.image_url} alt="" height="200px" />
							<br />
							<h2 className="card-title">{project.name} </h2>
							<br />
							<p className="card-text">Created by : {project.author.name}</p>
							<br />
							<p className="card-text">Address: {project.address}</p>
							<br />
							<p className="card-text">Description: {project.description}</p>

							<p className="card-text">Comments: </p>
							{project.comments.map((comment, index) => <p key={index}>{comment}</p>)}
							<br />
							<button className="btn-purple btn-card" onClick={() => this.redirect(project._id)}>
								SEE MORE
							</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default AllProjects;

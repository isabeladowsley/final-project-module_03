import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

import default_img from '../images/default_project.jpg';

class AllProjects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allprojects: []
		};
	}

	componentDidMount() {
		fetch('http://localhost:5000/api/allprojects')
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

	render() {
		return (
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
					</div>
				))}
			</div>
		);
	}
}

export default AllProjects;

import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './Navbar.js';

class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: '',
			comment: '',
			user: this.props.currentUser,
			author: ''
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	componentDidMount() {
		const { params } = this.props.match;
		axios
			.get(`http://localhost:5000/api/allprojects/${params.id}`)
			.then((responseFromApi) => {
				const theProject = responseFromApi.data;
				this.setState({ project: theProject, author: theProject.author.name });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		const { project, comment } = this.state;
		axios.put(`http://localhost:5000/api/allprojects/${this.state.project._id}`, { project, comment });

		Swal.fire('Thanks for your info');
		this.props.history.push('/allprojects');
	};

	render() {
		return (
			<div className="maincontainer">
				<NavBar handleLogout={this.props.handleLogout} />
				<form onSubmit={this.handleFormSubmit}>
					&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
					<img className="card-image" src={this.state.project.image_url} alt="" height="300px" />
					<br />
					<br />
					<br />
					<br />
					<h2 className="text-purple">{this.state.project.name} </h2>
					<br />
					<h3 className="text-green">
						Created by : <span className="text-white">{this.state.author}</span>
					</h3>
					<br />
					<h3 className="text-green">
						Address: <span className="text-white">{this.state.project.address}</span>
					</h3>
					<br />
					<h3 className="text-green">
						Description: <span className="text-white">{this.state.project.description}</span>
					</h3>
					<br />
					<h3 className="text-green">Leave a comment </h3>
					<textarea className="form-control" name="comment" rows="5" onChange={this.changeHandler} />
					<input className="btn btn-green" type="submit" value="SUBMIT YOUR CHANGES" />
				</form>
			</div>
		);
	}
}

export default Project;

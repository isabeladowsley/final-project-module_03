import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MapContainer from './MapContainer';
import LocationSearchInput from './LocationSearchInput';
import NavBar from './Navbar';
import service from '../service';

// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class NewProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
			geolocation: '',
			description: '',
			author: this.props.currentUser,
			image_url: ''
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setAddress = this.setAddress.bind(this);
		this.setGeo = this.setGeo.bind(this);
	}

	setAddress = (address) => {
		this.setState({ address: address });
	};

	setGeo = (geolocation) => {
		this.setState({ geolocation: geolocation });
	};

	changeHandler = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { name, address, geolocation, description, author, image_url } = this.state;
		axios
			.post(`${process.env.REACT_APP_API_URL}/new-project`, {
				name,
				address,
				geolocation,
				description,
				author,
				image_url
			})
			.then(() => {
				this.setState({
					name: '',
					address: '',
					geolocation: '',
					description: '',
					image_url: ''
				});
				Swal.fire('Your project was submitted!');
				this.props.history.push('/');
			})
			.catch((error) => console.log(error));
	};

	handleFileUpload = (e) => {
		console.log('The file to be uploaded is: ', e.target.files[0]);

		const uploadData = new FormData();
		uploadData.append('imageUrl', e.target.files[0]);

		service
			.handleUpload(uploadData)
			.then((response) => {
				console.log('response is: ', response);
				this.setState({ image_url: response.secure_url });
			})
			.catch((err) => {
				console.log('Error while uploading the file: ', err);
			});
	};

	render() {
		return (
			<div className="maincontainer">
				<NavBar handleLogout={this.props.handleLogout} />
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="name">Project's name</label>
						<input
							type="text"
							className="form-control"
							name="name"
							aria-describedby="name"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="description">Tell us more about it</label>
						<textarea
							className="form-control"
							name="description"
							rows="5"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="picture">Add a picture</label>
						<input type="file" onChange={(e) => this.handleFileUpload(e)} />
						<LocationSearchInput setAddress={this.setAddress} setGeo={this.setGeo} />
						<button className="btn btn-green right-bottom" variant="info" type="submit">
							SAVE THE PROJECT
						</button>
						<MapContainer
							currentUser={this.state.author}
							setAddress={this.setAddress}
							setGeo={this.setGeo}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default NewProject;

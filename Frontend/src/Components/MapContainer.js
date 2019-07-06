import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import iconMarker from '../images/collaboration.png';

export class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			geolocation: '',
			user: this.props.currentUser,
			allprojects: [],
			allevents: [],
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {},
			url: ''
		};
	}

	setAddress = (address) => {
		this.setState({ address: address });
	};

	setGeo = (geolocation) => {
		this.setState({ geolocation: geolocation });
	};

	onMarkerClick = (props, marker, e) =>
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true,
			url: props.url
		});

	onMapClicked = (props) => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

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
		fetch('http://localhost:5000/api/allevents')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				this.setState({ allevents: data });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		const style = {
			width: '80%',
			height: 'auto'
		};

		const lat = this.state.user.geolocation.lat;
		const lng = this.state.user.geolocation.lng;

		return (
			<div>
				<Map
					className="map"
					google={this.props.google}
					zoom={14}
					style={style}
					initialCenter={{ lat: lat, lng: lng }}
				>
					<Marker name={'Your place!'} position={this.state.geolocation} onClick={this.onMarkerClick} />
					<InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
						<div>
							<h1 className="infowindow">{this.state.selectedPlace.name}</h1>
							<a className="infowindow" href={this.state.url}>
								see more
							</a>
						</div>
					</InfoWindow>
					{this.state.allprojects.map((project, index) => (
						<Marker
							className="iconMarker"
							key={index}
							name={project.name}
							position={project.geolocation}
							onClick={this.onMarkerClick}
							url={`/allprojects/${project._id}`}
							// icon={iconMarker}
						/>
					))}
					{this.state.allevents.map((event, index) => (
						<Marker
							className="iconMarker"
							key={index}
							name={event.name}
							position={event.geolocation}
							onClick={this.onMarkerClick}
							url={`/allevents/${event._id}`}
							// icon={iconMarker}
						/>
					))}
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLEMAPS_API
})(MapContainer);

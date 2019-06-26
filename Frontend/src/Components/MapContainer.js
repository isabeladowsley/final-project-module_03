import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';

// import { faHome } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			geolocation: '',
			user: this.props.currentUser,
			projects: [],
			showingInfoWindow: false,
			activeMarker: {},
			selectedPlace: {}
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
			showingInfoWindow: true
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
		fetch('http://localhost:5000/api/allprojects', { credentials: 'include', method: 'GET' })
			.then((response) => {
				response.json();
				console.log('Testing:', response);
			})
			.then((data) => this.setState({ projects: data }))
			.catch(function(error) {
				console.log(error);
			});
	}

	// .then((res) => {
	// 	this.setState({ projects: res.data });
	// 	console.log('Hello', res.data);
	// })
	// .catch((error) => {
	// 	console.log(error);
	// });

	//

	render() {
		const style = {
			width: '100%',
			height: '100%'
		};

		const lat = this.state.user.geolocation.lat;
		const lng = this.state.user.geolocation.lng;

		return (
			<div>
				<Map google={this.props.google} zoom={16} style={style} initialCenter={{ lat: lat, lng: lng }}>
					<Marker name={'Your place!'} position={this.state.geolocation} onClick={this.onMarkerClick} />
					<InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
						<div>
							<h1 className="infowindow">
								<i className="fas fa-home" />
								<div>&nbsp;</div>
								{this.state.selectedPlace.name}
							</h1>
						</div>
					</InfoWindow>
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBx-Cm1hZ-LcaBezySvfmu2k5HpQKr1vNo'
})(MapContainer);

import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import LocationSearchInput from './LocationSearchInput.js';
import Swal from 'sweetalert2';

export class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			geolocation: ''
		};
	}

	setAddress = (address) => {
		this.setState({ address: address });
	};

	setGeo = (geolocation) => {
		this.setState({ geolocation: geolocation });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.setAddress(this.state.address);
		this.props.setGeo(this.state.geolocation);
		Swal.fire('You address is saved');
	};

	render() {
		const style = {
			width: '100%',
			height: '100%'
		};

		return (
			<div>
				<input type="button" value="Save the address" onClick={this.handleSubmit} />
				<LocationSearchInput setAddress={this.setAddress} setGeo={this.setGeo} />

				<Map
					google={this.props.google}
					zoom={12}
					style={style}
					initialCenter={{ lat: 52.370216, lng: 4.895168 }}
				>
					<Marker name={'Your home'} position={this.state.geolocation} />
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBPkvDH3fjGJdwogfZa6uoBFCucF9s72Ng'
})(MapContainer);

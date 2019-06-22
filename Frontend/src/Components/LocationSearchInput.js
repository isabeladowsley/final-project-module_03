import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			geolocation: ''
		};
	}

	handleChange = (address) => {
		this.setState({ address: address });
	};

	handleSelect = (address) => {
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then(this.props.setAddress(address))
			.then((latLng) => {
				this.setState({ geolocation: latLng });
				this.props.setGeo(latLng);
				console.log('Success', latLng);
			})
			.catch((error) => console.error('Error', error));
	};

	render() {
		return (
			<PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
				onSubmit={(e) => this.handleSubmit(e)}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<input
							{...getInputProps({
								placeholder: 'Search Places ...',
								className: 'location-search-input'
							})}
						/>
						<div className="autocomplete-dropdown-container">
							{loading && <div>Loading...</div>}
							{suggestions.map((suggestion) => {
								const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
								// inline style for demonstration purpose
								const style = suggestion.active
									? { backgroundColor: '#3a4042', cursor: 'pointer' }
									: { backgroundColor: '#3a4042', cursor: 'pointer' };
								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style
										})}
									>
										<span>{suggestion.description}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		);
	}
}

export default LocationSearchInput;

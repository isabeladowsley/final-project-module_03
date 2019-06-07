import Geocode from '../../node_modules/react-geocode/lib';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latidude & longitude.
export const fromLatLng = (lat, lng) =>
	Geocode.fromLatLng(lat, lng).then(
		(response) => {
			const address = response.results[0].formatted_address;
			console.log(address);
		},
		(error) => {
			console.error(error);
		}
	);

// Get latidude & longitude from address.
const fromAddress = (address) =>
	Geocode.fromAddress(address).then(
		(response) => {
			const { lat, lng } = response.results[0].geometry.location;
			console.log(lat, lng);
		},
		(error) => {
			console.error(error);
		}
	);

export default fromAddress;

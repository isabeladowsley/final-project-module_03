import Geocode from '../../node_modules/react-geocode/lib';

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

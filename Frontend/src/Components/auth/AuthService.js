import axios from 'axios';

class AuthService {
	service = axios.create({
		baseURL: 'http://localhost:5000',
		withCredentials: true
	});

	signup = (name, street, city, country, zipcode, geolocation, username, password, imageUrl) => {
		return this.service
			.post('/api/signup', {
				name: name,
				street: street,
				city: city,
				country: country,
				zipcode: zipcode,
				geolocation: geolocation,
				username: username,
				originalPassword: password,
				imageUrl: imageUrl
			})
			.then((response) => {
				console.log('response in authservice', response);
				if (response.error) {
					throw response.error;
				}
				return response.data;
			});
	};

	login = (username, password) => {
		return this.service
			.post('/api/login', { username: username, password: password })
			.then((response) => response.data);
	};

	logout = () => {
		return this.service.post('/api/logout');
	};

	currentUser = () => {
		return this.service.get('/api/my-page').then((response) => response.data);
	};
}

export default AuthService;

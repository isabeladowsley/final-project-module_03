import axios from 'axios';

class AuthService {
	service = axios.create({
		baseURL: `${process.env.REACT_APP_API_URL}`,
		withCredentials: true
	});

	signup = (name, address, geolocation, username, password, imageUrl, email) => {
		return this.service
			.post('/signup', {
				name: name,
				address: address,
				geolocation: geolocation,
				username: username,
				originalPassword: password,
				imageUrl: imageUrl,
				email: email
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
			.post('/login', { username: username, password: password })
			.then((response) => response.data);
	};

	logout = () => {
		return this.service.post('/logout');
	};

	currentUser = () => {
		return this.service.get('/my-page').then((response) => response.data);
	};
}

export default AuthService;

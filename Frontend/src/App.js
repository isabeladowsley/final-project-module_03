import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Swal from 'sweetalert2';

import './css/main.css';

import Home from './Components/Home.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
import Mypage from './Components/Mypage.js';
import NewProject from './Components/NewProject';
import NewEvent from './Components/NewEvent';
import AuthService from './Components/auth/AuthService';
import MyProjects from './Components/MyProjects';
import Profile from './Components/Profile';

class App extends Component {
	state = {
		user: null
	};

	service = new AuthService();

	setUser = (user, cb) => {
		this.setState({ user: user.userDoc }, cb);
	};

	componentDidMount() {
		fetch('http://localhost:5000/api/getUser', { credentials: 'include' })
			.then((response) => {
				console.log(response);
				if (!response.ok) {
					this.setState({ user: null });
					throw new Error({ message: 'user not logged in' });
				}
				response.json().then((user) => {
					this.setState({ user: user });
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleLogout = (e) => {
		e.preventDefault();
		this.service.logout();
		Swal.fire('You are logged out');
		this.setState({ user: null });
	};

	render() {
		if (this.state.user === null) {
			return (
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signup" render={(props) => <Signup {...props} />} />
					<Route exact path="/login" render={(props) => <Login setUser={this.setUser} {...props} />} />
				</Switch>
			);
		}
		return (
			<div className="App">
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => <Mypage handleLogout={this.handleLogout} currentUser={this.state.user} />}
					/>
					<Route
						path="/new-project"
						render={(props) => <NewProject currentUser={this.state.user} {...props} />}
					/>
					<Route
						path="/new-event"
						render={(props) => <NewEvent currentUser={this.state.user} {...props} />}
					/>
					<Route path="/profile" render={(props) => <Profile currentUser={this.state.user} />} />
					<Route
						path="/my-projects"
						render={(props) => <MyProjects currentUser={this.state.user} {...props} />}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;

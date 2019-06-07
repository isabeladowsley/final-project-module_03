import React, { Component } from 'react';
import './App.css';

import Home from './Components/Home.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
import Mypage from './Components/Mypage.js';

import { Switch, Route } from 'react-router-dom';
//import AuthService from './Components/auth/AuthService';

class App extends Component {
	state = {
		user: null
	};

	//service = new AuthService();

	setUser = (user) => {
		this.setState({ user: user.userDoc });
	};

	// fetchUser = () => {
	// 	if (this.state.user === null) {
	// 		this.service
	// 			.currentUser()
	// 			.then((response) => {
	// 				this.setState({ user: response });
	// 			})
	// 			.catch((err) => {
	// 				this.setState({ user: null });
	// 			});
	// 	}
	// };

	componentDidMount() {
		//this.fetchUser();
	}

	render() {
		if (this.state.user) {
			return <Mypage currentUser={this.state.user} />;
		}
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signup" component={Signup} />
					<Route exact path="/login" render={() => <Login setUser={this.setUser} />} />
					<Route exact path="/my-page" render={() => <Mypage currentUser={this.state.user} />} />
				</Switch>
			</div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Home from './Components/Home.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
import Mypage from './Components/Mypage.js';
import NewProject from './Components/NewProject';
import NewEvent from './Components/NewEvent';

class App extends Component {
	state = {
		user: null
	};

	setUser = (user) => {
		this.setState({ user: user.userDoc });
	};

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
					<Route path="/new-project" component={NewProject} />
					<Route path="/new-event" component={NewEvent} />
				</Switch>
			</div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import NavBar from './Navbar.js';

import EditProfile from './EditProfile';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.currentUser
		};
	}

	// componentDidMount(){
	// 	this.getSingleProject();
	//   }

	//   getSingleUser = () => {
	// 	const { params } = this.props.match;
	// 	axios.get(`http://localhost:5000/api/users/${params.id}`)
	// 	.then( responseFromApi =>{
	// 	  const theUser = responseFromApi.data;
	// 	  this.setState(theUser);
	// 	})
	// 	.catch((err)=>{
	// 		console.log(err)
	// 	})
	//   }

	// renderEditForm = () => {
	// 	if (!this.state.user.name) {
	// 		this.getSingleUser();
	// 	} else {
	// 		//
	// 		return <EditProfile theUser={this.state.user} getTheUser={this.getTheUser} {...this.props} />;
	// 	}
	// };

	upliftUser = (userUpdated) => {
		this.setState({ user: userUpdated });
	};

	render() {
		return (
			<div>
				<NavBar />
				<EditProfile currentUser={this.state.user} upliftUser={this.upliftUser} {...this.props} />
				<a className="btn btn-green" href="/">
					Back to your home page
				</a>
			</div>
		);
	}
}
export default Profile;

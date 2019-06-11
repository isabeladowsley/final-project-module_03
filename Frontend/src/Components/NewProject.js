import React, { Component } from 'react';

class NewProject extends Component {
	render() {
		return (
			<div>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="name">Project's name</label>
						<input
							type="text"
							className="form-control"
							name="name"
							aria-describedby="name"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="address">Address</label>
						<input
							type="text"
							className="form-control"
							name="street"
							aria-describedby="street"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="city">City</label>
						<input
							type="text"
							className="form-control"
							name="city"
							aria-describedby="city"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="country">Country</label>
						<input
							type="text"
							className="form-control"
							name="country"
							aria-describedby="country"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />
						<label htmlFor="description">Tell us more about it</label>
						<textarea
							className="form-control"
							id="exampleFormControlTextarea1"
							rows="5"
							onChange={(e) => this.changeHandler(e)}
						/>
						<br />

						<input type="submit" value="Save!" />
					</div>
				</form>
			</div>
		);
	}
}

export default NewProject;

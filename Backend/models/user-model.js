const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	projects: [],
	street: String,
	zipcode: String,
	city: String,
	country: String,
	geolocation: [],
	encryptedPassword: {
		type: String,
		required: true
	},
	imageUrl: String,
	timestamps: {
		createdAt: '',
		updatedAt: ''
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;

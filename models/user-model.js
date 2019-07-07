const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: String,
	projects: [ { type: Schema.Types.ObjectId, ref: 'Project' } ],
	events: [ { type: Schema.Types.ObjectId, ref: 'Event' } ],
	eventsAttending: [ { type: Schema.Types.ObjectId, ref: 'Event' } ],
	address: String,
	geolocation: Object,
	encryptedPassword: {
		type: String,
		required: true
	},
	imageUrl: String,
	timestamps: {
		createdAt: '',
		updatedAt: ''
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;

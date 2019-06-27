const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	projects: [ { type: Schema.Types.ObjectId, ref: 'Project' } ],
	events: [ { type: Schema.Types.ObjectId, ref: 'Event' } ],
	// eventsattending: { type: Schema.Types.Mixed, ref: 'Event' },
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
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;

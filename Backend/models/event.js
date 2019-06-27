const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: String,
	date: Date,
	address: String,
	geolocation: String,
	description: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	timestamps: {
		createdAt: '',
		updatedAt: ''
	}
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

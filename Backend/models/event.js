const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: String,
	date: Date,
	time: String,
	address: String,
	geolocation: {},
	description: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	atendees: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
	comments: [],
	image_url: String,
	timestamps: {
		createdAt: '',
		updatedAt: ''
	}
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

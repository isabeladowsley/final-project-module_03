const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: String,
	date: Date,
	address: String,
	atendees: Number,
	description: String,
	created_by: String,
	timestamps: {
		createdAt: '',
		updatedAt: ''
	}
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

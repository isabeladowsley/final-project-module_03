const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: String,
	date: Date,
	address: String,
	city: String,
	country: String,
	atendees: Number,
	description: String,
	author: { type: Schema.Types.Mixed, ref: 'User' },
	timestamps: {
		createdAt: '',
		updatedAt: ''
	}
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

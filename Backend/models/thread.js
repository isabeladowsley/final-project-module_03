const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
	name: String,
	description: String,
	threads: [],
	timestamps: {
		createdAt: '',
		updatedAt: ''
	}
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;

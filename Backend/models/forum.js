const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forumSchema = new Schema({
	name: String,
	description: String,
	threads: [],
	timestamps: {
		createdAt: '',
		updatedAt: ''
	}
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	comment: String,
	author: String,
	timestamps: {
		createdAt: '',
		updatedAt: ''
	}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

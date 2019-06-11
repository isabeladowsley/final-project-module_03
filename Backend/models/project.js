const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
	name: String,
	description: String,
	created_by: String,
	timestamps: {
		createdAt: '',
		updatedAt: ''
	}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

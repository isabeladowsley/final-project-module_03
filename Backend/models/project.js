const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
	name: String,
	address: String,
	geolocation: '',
	description: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	timestamps: {
		createdAt: '',
		updatedAt: ''
	}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

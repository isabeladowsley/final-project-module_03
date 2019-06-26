const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/project');
const User = require('../models/user-model');

router.get('/new-project', (req, res, next) => {
	Project.findById(req.params.projectId)
		.then((theProject) => {
			res.json(theProject);

			console.log('The project is ', theProject);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.post('/new-project', (req, res, next) => {
	// User.find().populate('project');
	Project.create({
		name: req.body.name,
		address: req.body.address,
		geolocation: req.body.geolocation,
		description: req.body.description,
		author: req.body.author
	})
		.then((response) => {
			console.log(response);
			Project.findById(response.id).populate('author');
			User.findOneAndUpdate(
				{ _id: response.author._id },
				{
					$push: { projects: response.id }
				},
				{ new: true }
			).catch((err) => {
				console.log(err);
			});

			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

// router.delete('/my-projects/:id', (req, res, next) => {
// 	debugger;
// 	Project.findOneAndDelete({ _id: req.params.id }).then((data) => res.json(data)).catch(next);
// });

router.delete('/my-projects/:id', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Project.findByIdAndRemove(req.params.id)
		.then(() => {
			res.json({ message: `Project with ${req.params.id} is removed successfully.` });
		})
		.catch((err) => {
			res.json(err);
		});

	console.log('Testing delete', req.params);

	User.update({ _id: req.params.author }, { $pull: { projects: { _id: req.params.id } } }, { safe: true });
});

router.get('/allprojects', (req, res, next) => {
	Project.find()
		.then((allProjectsFromDB) => {
			console.log('Retrieved projects from DB:', allProjectsFromDB);
			res.json();
		})
		.catch((error) => {
			console.log('Error while getting the projects from the DB: ', error);
		});
});

module.exports = router;

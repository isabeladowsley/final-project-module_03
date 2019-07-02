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
		author: req.body.author,
		image_url: req.body.image_url
	})
		.then((response) => {
			console.log(response);
			Project.findById(response.id)
				.then((response) => {
					console.log('Testing', response);
					User.findOneAndUpdate(
						{ _id: response.author._id },
						{
							$push: { projects: response.id }
						},
						{ new: true }
					);
					res.json(response);
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			res.json(err);
		});
});

router.get('/allprojects', (req, res, next) => {
	Project.find()
		.populate('author')
		.then((allProjectsFromDB) => {
			// console.log('Retrieved projects from DB:', allProjectsFromDB);
			let json = JSON.stringify(allProjectsFromDB);
			res.send(allProjectsFromDB);
		})
		.catch((error) => {
			console.log('Error while getting the projects from the DB: ', error);
		});
});

router.get('/allprojects/:id', (req, res, next) => {
	Project.find()
		.then((allProjectsFromDB) => {
			console.log('Retrieved projects from DB:', allProjectsFromDB);
			let json = JSON.stringify(allProjectsFromDB);
			// console.log(json);
			res.send(allProjectsFromDB);
		})
		.catch((error) => {
			console.log('Error while getting the projects from the DB: ', error);
		});
});

router.delete('/allprojects/:id', (req, res, next) => {
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

module.exports = router;

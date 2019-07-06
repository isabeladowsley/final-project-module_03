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
	Project.create({
		name: req.body.name,
		address: req.body.address,
		geolocation: req.body.geolocation,
		description: req.body.description,
		author: req.body.author,
		image_url: req.body.image_url
	})
		.then((response) => {
			Project.findById(response.id)
				.then((response) => {
					return User.findOneAndUpdate(
						{ _id: response.author._id },
						{ $push: { projects: response.id } },
						{ new: true }
					);
				})
				.then((updateUser) => {
					res.json(updateUser);
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
			let json = JSON.stringify(allProjectsFromDB);
			res.send(allProjectsFromDB);
		})
		.catch((error) => {
			console.log('Error while getting the projects from the DB: ', error);
		});
});

router.get('/allprojects/:id', (req, res, next) => {
	Project.findById(req.params.id)
		.populate('author')
		.then((project) => {
			console.log('Hey', req.params.id);
			res.json(project);
		})
		.catch((err) => {
			res.json(err);
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

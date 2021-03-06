const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/project');
const User = require('../models/user-model');

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

router.get('/getprojects', (req, res, next) => {
	Project.find()
		.populate('author')
		.then((allProjectsFromDB) => {
			res.status(200).json(allProjectsFromDB);
		})
		.catch((error) => {
			console.log('Error while getting the projects from the DB: ', error);
		});
});

router.get('/getprojects/:id', (req, res, next) => {
	Project.findById(req.params.id)
		.populate('author')
		.then((project) => {
			console.log('Hey', req.params.id);
			res.status(200).json(project);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.put('/allprojects/:id', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Project.findByIdAndUpdate(
		req.params.id,
		{ $push: { comments: req.body.comment } },
		{ safe: true, upsert: true, new: true },
		function(err, model) {
			console.log(err);
		}
	);
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

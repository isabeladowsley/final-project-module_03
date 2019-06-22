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
		author: req.body.author
	})
		.then((response) => {
			// User.findByIdAndUpdate(req.body.author, { $push: { projects: response._id } });
			console.log(response);
			debugger;
			User.findByIdAndUpdate(
				{ _id: '5cfff4d79d5298a72758d0d1' },
				{
					$push: { projects: '12312312' }
				},
				{ new: true }
			);
			debugger;
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;

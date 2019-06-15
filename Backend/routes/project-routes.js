const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/project');

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
		city: req.body.city,
		country: req.body.country,
		description: req.body.description,
		author: req.body.author
	})
		.then((response) => {
			User.findByIdAndUpdate(req.body.author, { $push: { projects: response._id } });
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;

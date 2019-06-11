const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Project = require('../models/project');

// POST route => to create a new project

router.post('/new-project', (req, res, next) => {
	Project.create({
		name: req.body.name,
		address: req.body.address,
		city: req.body.city,
		country: req.body.country,
		description: req.body.description
	})
		.then((response) => {
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Event = require('../models/event');

router.get('/new-event', (req, res, next) => {
	Event.findById(req.params.eventId)
		.then((theEvent) => {
			res.json(theEvent);
			console.log('The event is ', theEvent);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.post('/new-event', (req, res, next) => {
	Event.create({
		name: req.body.name,
		date: req.body.date,
		address: req.body.address,
		city: req.body.city,
		country: req.body.country,
		description: req.body.description,
		author: req.body.author
	})
		.then((response) => {
			User.findByIdAndUpdate(req.body.author, { $push: { events: response._id } });
			res.json(response);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;

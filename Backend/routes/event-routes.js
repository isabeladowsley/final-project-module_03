const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Event = require('../models/event');
const User = require('../models/user-model');

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
		geolocation: req.body.geolocation,
		description: req.body.description,
		author: req.body.author
	})
		.then((response) => {
			console.log(response);
			Event.findById(response.id).populate('author');
			User.findOneAndUpdate(
				{ _id: response.author._id },
				{
					$push: { events: response.id }
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

router.delete('/my-events/:id', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Event.findByIdAndRemove(req.params.id)
		.then(() => {
			res.json({ message: `Event with ${req.params.id} is removed successfully.` });
		})
		.catch((err) => {
			res.json(err);
		});

	User.update({ _id: req.params.author }, { $pull: { events: { _id: req.params.id } } }, { safe: true });
});

module.exports = router;

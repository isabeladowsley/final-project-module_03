const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Event = require('../models/event');
const User = require('../models/user-model');

router.post('/new-event', (req, res, next) => {
	Event.create({
		name: req.body.name,
		date: req.body.date,
		time: req.body.time,
		address: req.body.address,
		geolocation: req.body.geolocation,
		description: req.body.description,
		author: req.body.author,
		image_url: req.body.image_url
	})
		.then((response) => {
			console.log('Hey testing', response);
			Event.findById(response.id)
				.then((response) => {
					return User.findOneAndUpdate(
						{ _id: response.author._id },
						{ $push: { events: response.id } },
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
			res.status(500).json(err);
		});
});

router.get('/getevents', (req, res, next) => {
	Event.find()
		.populate('author')
		.then((allEventsFromDB) => {
			res.json(allEventsFromDB);
		})
		.catch((error) => {
			console.log('Error while getting the events from the DB: ', error);
		});
});

router.get('/getevents/:id', (req, res, next) => {
	Event.findById(req.params.id)
		.populate('author')
		.then((event) => {
			console.log(event);
			res.status(200).json(event);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.put('/allevents/:id', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Event.findByIdAndUpdate(
		req.params.id,
		{ $push: { comments: req.body.comment } },
		{ safe: true, upsert: true, new: true },
		function(err, model) {
			console.log(err);
		}
	);

	if (req.body.isGoing == true) {
		Event.findByIdAndUpdate(
			req.params.id,
			{ $push: { atendees: req.body.user._id } },
			{ safe: true, upsert: true, new: true },
			function(err, model) {
				console.log(err);
			}
		)
			.then(() => {
				User.findByIdAndUpdate(
					req.body.user._id,
					{ $push: { eventsAttending: req.params.id } },
					{ safe: true, upsert: true, new: true },
					function(err, model) {
						console.log(err);
					}
				);
			})
			.catch((err) => {
				res.json(err);
			});
	}
});

router.delete('/allevents/:id', (req, res, next) => {
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

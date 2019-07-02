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
		time: req.body.time,
		address: req.body.address,
		geolocation: req.body.geolocation,
		description: req.body.description,
		author: req.body.author
	})
		.then((response) => {
			console.log('Project created', response);
			Event.findById(response.id)
				.populate('author')
				.then((response) => {
					User.findOneAndUpdate(
						{ _id: response.author._id },
						{
							$push: { events: response.id }
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

router.get('/allevents', (req, res, next) => {
	Event.find()
		.then((allEventsFromDB) => {
			// console.log('Retrieved events from DB:', allEventsFromDB);
			let json = JSON.stringify(allEventsFromDB);
			// console.log(json);
			res.send(allEventsFromDB);
		})
		.catch((error) => {
			console.log('Error while getting the events from the DB: ', error);
		});
});

router.get('/allevents/:id', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Event.findById(req.params.id, req.body)
		.then((Event) => {
			console.log(req.params.id);
			res.json(Event);
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

	User.findByIdAndUpdate(req.params.id, req.body)
		.then(() => {
			console.log(req.body);
			console.log(req.params.id);
			res.json({ message: `Event with ${req.params.id} is updated successfully.` });
		})
		.catch((err) => {
			res.json(err);
		});
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

// router.post('/confirmation', (req, res, next) => {
// 	Event.findByIdAndUpdate(response.id , )
// })

module.exports = router;

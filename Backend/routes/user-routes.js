const express = require('express');
const router = express.Router();

const User = require('../models/user-model');

router.get('/users', (req, res, next) => {
	User.find()
		.then((allUsersFromDB) => {
			console.log('Retrieved projects from DB:', allUsersFromDB);
			res.json();
		})
		.catch((error) => {
			console.log('Error while getting the users from the DB: ', error);
		});
});

router.put('/users/:id', (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	User.findByIdAndUpdate(req.params.id, req.body)
		.then(() => {
			res.json({ message: `User with ${req.params.id} is updated successfully.` });
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;

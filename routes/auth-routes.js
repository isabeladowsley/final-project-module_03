const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

const FacebookStrategy = require('passport-facebook').Strategy;

router.post('/signup', (req, res, next) => {
	const { name, address, geolocation, username, originalPassword, imageUrl, email } = req.body;
	if (name == '' || address == '' || username == '' || originalPassword.match(/[0-9]/) === null) {
		res.status(500).json({ message: 'All fields need to be filled and password must contain a number.' });
		return;
	}

	User.findOne({ username })
		.then((foundUser) => {
			if (foundUser !== null) {
				res.status(401).json({ message: 'A user with the same username is already registered!' });
				return;
			}
			const salt = bcrypt.genSaltSync(bcryptSalt);
			const encryptedPassword = bcrypt.hashSync(originalPassword, salt);

			User.create({ name, address, geolocation, username, encryptedPassword, imageUrl, email })
				.then((userDoc) => {
					console.log(userDoc);
					req.login(userDoc, () => {
						userDoc.encryptedPassword = undefined;
						res.json({ userDoc });
					});
				})
				.catch((err) => next(err));
		})
		.catch((err) => next(err));
});

//////////////// LOGIN /////////////////////
router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, userDoc, failureDetails) => {
		if (err) {
			res.status(500).json({ message: 'Something went wrong' });
			return;
		}

		if (!userDoc) {
			res.status(401).json(failureDetails);
			return;
		}

		req.login(userDoc, (err) => {
			if (err) {
				res.status(500).json({ message: 'Something went wrong while login!' });
				return;
			}
			res.json({ userDoc });
		});
	})(req, res, next);
});

//////////////// LOGOUT /////////////////////

router.post('/logout', (req, res, next) => {
	req.logOut();
	res.json({ userDoc: null });
});

router.get('/checkuser', (req, res, next) => {
	if (req.user) {
		req.user.encryptedPassword = undefined;
		res.json({ userDoc: req.user });
	} else {
		res.json({ userDoc: null });
	}
});

router.get('/getUser', (req, res, next) => {
	console.log(req.user);
	if (req.isAuthenticated()) {
		User.findById(req.user.id)
			.populate('projects')
			.populate('events')
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((error) => console.log(error));
	} else {
		res.status(403).json({ message: 'user not logged in' });
	}
	return;
});

module.exports = router;

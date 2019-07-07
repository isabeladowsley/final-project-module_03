const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const crypto = require('crypto');

const passport = require('passport');
const bcrypt = require('bcryptjs');

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
			console.log(req.body);
			console.log(req.params.id);
			res.json({ message: `User with ${req.params.id} is updated successfully.` });
		})
		.catch((err) => {
			res.json(err);
		});
});

// Reset Password - Nodemailer

router.post('/forgotPassword', (req, res) => {
	if (req.body.email === '') {
		res.status(400).send('email required');
	}
	console.error(req.body.email);

	User.findOne({
		email: req.body.email
	}).then((user) => {
		if (user === null) {
			console.error('email not in database');
			res.status(403).send('email not in db');
		} else {
			const token = crypto.randomBytes(20).toString('hex');
			User.update({
				resetPasswordToken: token,
				resetPasswordExpires: Date.now() + 360000
			});

			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: `${process.env.EMAIL_ADDRESS}`,
					pass: `${process.env.EMAIL_PASSWORD}`
				}
			});

			const mailOptions = {
				from: 'Peerful',
				to: `${user.email}`,
				subject: 'Link To Reset Password',
				text:
					'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
					'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
					`http://localhost:3000/reset/${token}\n\n` +
					'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			};

			console.log('sending mail');

			transporter.sendMail(mailOptions, (err, response) => {
				if (err) {
					console.error('there was an error: ', err);
				} else {
					console.log('here is the res: ', response);
					res.status(200).json('recovery email sent');
				}
			});
		}
	});
});

router.get('/reset', (req, res) => {
	User.findOne({
		where: {
			resetPasswordToken: req.query.resetPasswordToken
		}
	}).then((user) => {
		if (user == null) {
			console.error('password reset link is invalid or has expired');
			res.status(403).send('password reset link is invalid or has expired');
		} else {
			res.status(200).send({
				username: user.username,
				message: 'password reset link a-ok'
			});
		}
	});
});

const BCRYPT_SALT_ROUNDS = 12;

router.put('/updatePassword', (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (err) {
			console.error(err);
		}
		if (info !== undefined) {
			console.error(info.message);
			res.status(403).send(info.message);
		} else {
			User.findOne({
				where: {
					username: req.body.username
				}
			}).then((userInfo) => {
				if (userInfo != null) {
					console.log('user found in db');
					bcrypt
						.hash(req.body.password, BCRYPT_SALT_ROUNDS)
						.then((hashedPassword) => {
							userInfo.update({
								password: hashedPassword
							});
						})
						.then(() => {
							console.log('password updated');
							res.status(200).send({ auth: true, message: 'password updated' });
						});
				} else {
					console.error('no user exists in db to update');
					res.status(404).json('no user exists in db to update');
				}
			});
		}
	})(req, res, next);
});

module.exports = router;

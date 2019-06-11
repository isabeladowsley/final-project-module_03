const express = require('express');
const router = express.Router();

// include CLOUDINARY:
const uploader = require('../configs/cloudinary-setup');

router.post('/upload', uploader.single('imageUrl'), (req, res, next) => {
	// console.log('file is: ', req.file)

	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	// get secure_url from the file object and save it in the
	// variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
	res.json({ secure_url: req.file.secure_url });
});

router.post('/linkImage', (req, res, next) => {
	//1. extract values from body: userID & imageURL
	//2. find userDoc in DB for specific userID
	//3. update imageUrl property for that userDocument
});
module.exports = router;

/* eslint-disable indent */
const express = require('express');
const User = require('../models').User;
const { check, validationResult } = require('express-validator/check');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const router = express.Router();



const authenticateUser = async (req, res, next) => {
  let message = null;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  // Attempt to retrieve the user from the data store
  // by their username (i.e. the user's "key"
  // from the Authorization header).
  if (credentials) {
		const user = await User.findOne({emailAddress: credentials.name});

		// If a user was successfully retrieved from the data store...
		// Use the bcryptjs npm package to compare the user's password
		// (from the Authorization header) to the user's password
		// that was retrieved from the data store.
		if (user) {
			const authenticated = bcryptjs.compareSync(
				credentials.pass,
				user.password
			);

			// If the passwords match...
			// Then store the retrieved user object on the request object
			// so any middleware functions that follow this middleware function
			// will have access to the user's information.
			if (authenticated) {
				console.log(`Authentication successful for username: ${user.username}`);
				// Set found user data to variable to be used later in routes
				req.currentUser = user;
			} else {
				message = `Authentication failure for username: ${user.username}`;
			}
		} else {
			message = `User not found for username: ${credentials.emailAddress}`;
		}
  } else {
    message = "Auth header not found";
  }

  // If user authentication failed...
  if (message) {
    console.log(message);
    // Return a response with a 401 Unauthorized HTTP status code.
    res.status(401).json({ message: "Access Denied" });
  } else {
    // Or if user authentication succeeded...
    // Call the next() method.
    next();
  }
};



// GET /api/users 200
// return the currently authenticated user
router.get("/", authenticateUser, (req, res) => {
  const user = req.currentUser;
  const { firstName, lastName, emailAddress } = req.currentUser;
  res.json({ firstName, lastName, emailAddress });
});



// POST /api/users 201
// Creates a user, sets the Location header to "/", and returns no content
router.post('/', [
	check('firstName')
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage('Please provide a value for "first name"'),
	check('lastName')
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage('Please provide a value for "last name"'),
	check('emailAddress')
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage('Please provide a value for "email"')
		.isEmail()
		.withMessage('Please provide a valid email address for "email"'),
	check('password')
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage('Please provide a value for "password"')
		.isLength({ min: 8, max: 20 })
		.withMessage('Please provide a value for "password" that is between 8 and 20 characters in length'),
],
async (req, res) => {
	// Attempt to get the validation result from the Request object.
	const errors = validationResult(req);

	// If there are validation errors...
	if (!errors.isEmpty()) {
		// Use the Array `map()` method to get a list of error messages.
		const errorMessages = errors.array().map(error => error.msg);
		// Return the validation errors to the client.
		return res.status(400).json({ errors: errorMessages });
	}
	// Get the user from the request body.
	const user = req.body;
	
	// const existingEmail = user.emailAddress;

	const existingUser = await User.findOne({
		where: {
			emailAddress: user.emailAddress
		}
	});

	if (!existingUser) {

		// Hash the new user's password.
		user.password = bcryptjs.hashSync(user.password);

		// Create user
		User.create({
			firstName: user.firstName,
			lastName: user.lastName,
			emailAddress: user.emailAddress,
			password: user.password
		});

		// Set the status to 201 Created and end the response.
		res.location('/').status(201).end();
	} else {
		res.status(400).json({ message: "Email address already exists" });
	}
});



module.exports = router;
const express = require('express');
const Course = require('../models').Course;
const User = require('../models').User;
const { check, validationResult } = require("express-validator/check");
// const { authenticateUser } = require("./users");
const bcryptjs = require("bcryptjs");
const auth = require("basic-auth");

const router = express.Router();


// Helper function so that we don't need to add try/catch to every route
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}


const authenticateUser = asyncHandler( async (req, res, next) => {
  let message = null;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  // Attempt to retrieve the user from the data store
  // by their username (i.e. the user's "key"
  // from the Authorization header).
  if (credentials) {
    const user = await User.findOne({
      where: {
        emailAddress: credentials.name
      }
    });

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
});


// GET /api/courses 200
// Returns a list of courses (including the user that owns each course)
router.get('/', asyncHandler( async (req, res) => {
	// throw new Error('Oh noooooooo!');
	const courses = await Course.findAll({
		attributes: ["id", "title", "description", "userId"],
		include: [
			{
				model: User,
				attributes: ["id", "firstName", "lastName", "emailAddress",]
			}
		]
	});
	res.json({ courses });
}));


// GET /api/courses/:id 200
// Returns a course (including the user that owns the course) for the provided course ID
router.get('/:id', asyncHandler( async (req, res) => {
	// throw new Error('Oh noooooooo!');
	const course = await Course.findByPk(req.params.id, {
		attributes: ["id", "title", "description", "userId"],
		include: [
			{
				model: User,
				attributes: ["id", "firstName", "lastName", "emailAddress"]
			}
		]
	});
	if (course) {
		res.json({ course });
	} else {
		res.status(404).json({ message: 'Course id not found.' });
	}
}));


// POST /api/courses 201
// Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/', [
	check('title')
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage('Please provide a value for "title"'),
	check('description')
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage('Please provide a value for "description"'),
],
authenticateUser, asyncHandler( async (req, res) => {
	// Attempt to get the validation result from the Request object.
	const errors = validationResult(req);

	// If there are validation errors...
	if (!errors.isEmpty()) {
		// Use the Array `map()` method to get a list of error messages.
		const errorMessages = errors.array().map(error => error.msg);
		// Return the validation errors to the client.
		return res.status(400).json({ errors: errorMessages });
	} else {

		// Get the user from the request body.
		const course = req.body;
		const userId = req.currentUser.id;

		// Create user
		const addedCourse = await Course.create({
			title: course.title,
			description: course.description,
			userId: userId
		});

		// get new course id
		const id = addedCourse.id;

		// Set the status to 201 Created and end the response.
		res.location(`/api/courses/${id}`).status(201).end();
	}
}));








// PUT /api/courses/:id 204
// Updates a course and returns no content
router.put('/:id', [
	check('title')
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage('Please provide a value for "title"'),
	check('description')
		.exists({ checkNull: true, checkFalsy: true })
		.withMessage('Please provide a value for "description"'),
	],
	authenticateUser,  asyncHandler( async (req, res) => {
		// Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		// If there are validation errors...
		if (!errors.isEmpty()) {
			// Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map(error => error.msg);
			// Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {

			// find existing course
			const course = await Course.findByPk(req.params.id, {
				attributes: ["id", "title", "description", "userId"],
				include: [
					{
						model: User,
						attributes: ["id", "firstName", "lastName", "emailAddress"]
					}
				]
			});

			if (course) {
				const updatedCourse = await Course.update({
					title: req.body.title,
					description: req.body.description
				}, {
					where: {
						id: course.id
					}
				});

				if (updatedCourse) {
					res.status(204).end();
				}
			} else {
				res.status(404).json({ message: "Course not found." });
			}
		}
	}
));



// DELETE /api/courses/:id 204
// Deletes a course and returns no content
router.delete("/courses/:id", asyncHandler( async (req, res, next) => {
	// throw new Error('Oh noooooooo!');
	// const quote = await records.getQuote(req.params.id);
	// if (quote) {
	// 	await records.deleteQuote(quote);
	// 	res.status(204).end();
	// } else {
	// 	res.status(404).json({ message: "Quote not found." });
	// }
}));


router.delete(
  "/:id", authenticateUser, asyncHandler(async (req, res) => {



      // find existing course
      const course = await Course.findByPk(req.params.id, {
        attributes: ["id", "title", "description", "userId"],
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName", "emailAddress"]
          }
        ]
      });

      if (course) {
				if (course.userId == req.currentUser.id) {
					const deletedCourse = await Course.destroy(
						{
							where: {
								id: course.id
							}
						}
					);

					if (deletedCourse) {
						res.status(204).end();
					}
				
				} else {
					// Return a response with a 401 Unauthorized HTTP status code.
        	res.status(401).json({ message: "Access denied" });

				}
      } else {
        res.status(404).json({ message: "Course not found." });
      }
  })
);





module.exports = router;

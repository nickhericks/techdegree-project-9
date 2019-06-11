const express = require('express');
const Course = require('../models').Course;
const User = require('../models').User;

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


// GET /api/courses 200
// Returns a list of courses (including the user that owns each course)
router.get('/', asyncHandler( async (req, res) => {
	// throw new Error('Oh noooooooo!');
	const courses = await Course.findAll({
		attributes: [
			"id",
			"title",
			"description",
			"userId"
		],
		include: [
			{
				model: User,
				attributes: [
					"id",
					"firstName",
					"lastName",
					"emailAddress",
				]
			}
		]
	});
	res.json({ courses });
}));


// GET /api/courses/:id 200
// Returns a course (including the user that owns the course) for the provided course ID
router.get('/:id', asyncHandler( async (req, res) => {
	// throw new Error('Oh noooooooo!');
	const courseId = req.params.id;
	const course = await Course.findOne({
		where: {
			id: courseId
		},
		attributes: ["id", "title", "description", "userId"],
		include: [
			{
				model: User,
				attributes: ["id", "firstName", "lastName", "emailAddress"]
			}
		]
	});
	res.json({ course });
}));


// POST /api/courses 201
// Creates a course, sets the Location header to the URI for the course, and returns no content



// PUT /api/courses/:id 204
// Updates a course and returns no content



// DELETE /api/courses/:id 204
// Deletes a course and returns no content






module.exports = router;

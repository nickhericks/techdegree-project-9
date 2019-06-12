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



// PUT /api/courses/:id 204
// Updates a course and returns no content
router.post('/', asyncHandler( async (req, res) => {
	// throw new Error('Oh noooooooo!');
	// if(req.body.title && req.body.description) {
	// 	const quote = await records.createQuote({
	// 		title: req.body.title,
	// 		description: req.body.description
	// 	});
	// 	res.status(201).json(quote);
	// } else {
	// 	res.status(400).json({message: 'Quote and author required.'});
	// }  
}));


// DELETE /api/courses/:id 204
// Deletes a course and returns no content






module.exports = router;

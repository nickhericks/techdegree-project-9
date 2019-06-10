const express = require('express');
const User = require('../models').User;

const router = express.Router();

// GET /api/users 200
// return the currently authenticated user
router.get('/', (req, res) => {
	res.json({ greeting: 'user routes' });
});


// POST /api/users 201
// Creates a user, sets the Location header to "/", and returns no content
router.post('/', (req, res) => {
	res.json({ greeting: 'user routes' });
});







module.exports = router;

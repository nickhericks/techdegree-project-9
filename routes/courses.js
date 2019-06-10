const express = require('express');
const Course = require("./models").Course;

const router = express.Router();

router.get('/', (req, res) => {
	res.json({ greeting: 'courses route' });
});

module.exports = router;

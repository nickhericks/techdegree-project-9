const express = require('express');
const User = require('./models').User;

const router = express.Router();

router.get('/', (req, res) => {
	res.json({ greeting: 'user routes' });
});

module.exports = router;

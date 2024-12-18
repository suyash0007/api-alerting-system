const express = require('express');
const { getMetrics } = require('../controllers/controller');
const validateRequest = require('../middlewares/auth');

const router = express.Router();

//post route to validate incoming request 
router.post('/submit', validateRequest, (req, res) => {
  res.status(200).json({ message: 'Request successful' });
});

//get request to fetch the error logs
router.get('/metrics', getMetrics);

module.exports = router;

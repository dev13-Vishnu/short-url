const express = require('express');
const { handleGenerateNewShortURL, handleUpdateAndRedirect, handleGetAnalytics } = require('../controllers/url');

const router = express.Router();

router.post('/',handleGenerateNewShortURL)

router.get('/:shortId',handleUpdateAndRedirect);

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;
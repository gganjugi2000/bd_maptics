const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const logger = require('../logger/winston');

// asyncHandler test
router.get('/test', asyncHandler((req, res) => {
   logger.info('asyncHandler test ok!!');
   res.send('asyncOK');
}));

// get test
router.get('/test1', (req, res) => {
   logger.info('get test1 ok!!');
   res.send('getOK');
});

// post test
router.post('/test2', (req, res) => {
   logger.info('post test2 ok!!');
   res.send('postOK');
});

module.exports = router; 
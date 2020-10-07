const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const logger = require('../logger/winston');

// asyncHandler test
router.get('/test', asyncHandler((req, res) => {
   logger.info('asyncHandler test ok!!');
   res.send();
}));

// get test
router.get('/test1', (req, res) => {
   logger.info('get test1 ok!!');
   res.send();
});

// post test
router.post('/test2', (req, res) => {
   logger.info('post test2 ok!!');
   res.send();
});

module.exports = router; 
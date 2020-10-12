const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const logger = require('../../logger/winston');
const commonService = require('../../service/commonService');

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

router.get('/users', asyncHandler(async (req, res) => {
   logger.info('get users called');
   let data = await commonService.getUserList();
   res.status(200).send(data);
}));

module.exports = router; 
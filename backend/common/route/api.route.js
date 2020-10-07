const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();

// asyncHandler test
router.get('/test', asyncHandler((req, res) => {
   console.log('test ok!!');
   res.send();
}));

// get test
router.get('/test1', (req, res) => {
   console.log('get test1 ok!!');
   res.send();
});

// post test
router.post('/test2', (req, res) => {
   console.log('post test2 ok!!');
   res.send();
});

module.exports = router; 
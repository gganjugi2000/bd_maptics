const express = require('express');
const cmmRouter = require('./common');
const fileUpRouter = require('./file');
const router = express.Router();

router.use("/cmm", cmmRouter);
router.use("/file", fileUpRouter);

module.exports = router; 
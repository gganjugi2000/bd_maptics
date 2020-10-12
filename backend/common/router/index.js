const express = require('express');
const cmmRouter = require('./api/common');
const fileUpRouter = require('./api/file');
const router = express.Router();

router.use("/cmm", cmmRouter);
router.use("/file", fileUpRouter);

module.exports = router; 
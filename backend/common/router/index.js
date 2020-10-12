const express = require('express');
const cmmRouter = require('./api/common');
const router = express.Router();

router.use("/cmm", cmmRouter);

module.exports = router; 
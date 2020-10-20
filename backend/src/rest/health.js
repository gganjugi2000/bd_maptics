const express = require('express');
const router = express.Router();
const logger = require('../utils/logger/winston');

// Add a health check route in express
router.get("/",  (req, res) => {
    res.status(200).send({result: {code: 200, message: "success", data : ""}});
});

module.exports = router;
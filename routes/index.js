// index.js
const express = require('express');
const router = express.Router();

const testRouter = require('./test-router')
const driverRouter = require('./driver-router')



router.use(testRouter);
router.use(driverRouter);
module.exports = router;

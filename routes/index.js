// index.js
const express = require('express');
const router = express.Router();

const testRouter = require('./test-router')
const roomRouter = require('./room-router')
const driverRouter = require('./driver-router')


router.use(testRouter);
router.use(roomRouter);
router.use(driverRouter);
module.exports = router;

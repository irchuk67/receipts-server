const express = require('express');
const router = express.Router();

router.use('/receipts', require('./receipts'))
router.use('/users', require('./registration'))

module.exports = router;
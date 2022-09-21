const express = require('express');
const router = express.Router();

router.use('/receipts', require('./receipts'))

module.exports = router;
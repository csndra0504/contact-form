const express = require('express');
const router = express.Router();
const contactController = require('./contactController');

router.get('/', contactController.getContactpage);

router.get('/send', contactController.sendEmails);

module.exports = router;

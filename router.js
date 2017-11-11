const express = require('express');
const router = express.Router();
import contactController from './contactController';

router.get('/', contactController.getContactpage);

router.get('/send', contactController.sendEmails);

module.exports = router;

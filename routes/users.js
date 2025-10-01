const express = require('express');
const router = express.Router();
const { upgradeToAdmin, Allusers } = require('../controllers/users.controller');
const { verifyGoogleToken } = require('../middleware/VerifyGoogleToken');

router.get('/', Allusers);
router.post('/upgrade-role', verifyGoogleToken, upgradeToAdmin);

module.exports = router;

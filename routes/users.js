const express = require('express');
const router = express.Router();
const { upgradeToAdmin, Allusers, deleteUser, downgradeRole } = require('../controllers/users.controller');
const { verifyGoogleToken } = require('../middleware/VerifyGoogleToken');
const { authorizeAdminOnly } = require('../middleware/auth.js');

router.get('/', Allusers);
router.post('/upgrade-role', verifyGoogleToken, upgradeToAdmin);
router.delete('/:id', verifyGoogleToken, authorizeAdminOnly, deleteUser);
router.put('/downgrade-role', verifyGoogleToken, authorizeAdminOnly, downgradeRole);

module.exports = router;

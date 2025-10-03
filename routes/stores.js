const express = require('express');
const router = express.Router();

const storesController = require('../controllers/stores.controller');
const {
  authorizeAdminOrEmployee,
  authorizeAdminOnly,
} = require('../middleware/auth');

const { verifyGoogleToken } = require('../middleware/VerifyGoogleToken');

router.get('/', storesController.getAllStores);
router.post(
  '/',
  verifyGoogleToken,
  authorizeAdminOnly,
  storesController.createStore
);

router.get('/:id', storesController.getStoreById);
router.put(
  '/:id',
  verifyGoogleToken,
  authorizeAdminOnly,
  storesController.updateStore
);
router.delete(
  '/:id',
  verifyGoogleToken,
  authorizeAdminOnly,
  storesController.deleteStore
);

module.exports = router;

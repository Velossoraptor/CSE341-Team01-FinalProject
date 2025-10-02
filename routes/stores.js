const express = require('express');
const router = express.Router();

const storesController = require('../controllers/stores.controller');
const { authorizeAdminOrEmployee } = require('../middleware/auth');

const { verifyGoogleToken } = require('../middleware/VerifyGoogleToken');

router.get('/', storesController.getAllStores);
router.post(
  '/',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  storesController.createStore
);

router.get('/:id', storesController.getStoreById);
router.put(
  '/:id',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  storesController.updateStore
);
router.delete(
  '/:id',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  storesController.deleteStore
);

module.exports = router;

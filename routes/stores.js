const express = require('express');
const router = express.Router();

const storesController = require('../controllers/stores.controller');
const { authorizeAdminOrEmployee } = require('../middleware/auth');
const { verifyGoogleToken } = require('../middleware/verifyGoogleToken');
const validationRequests = require('../middleware/validationRequests');
const { validateStoreId, validateStoreBody } = require('../middleware/storeValidation');

router.get('/', storesController.getAllStores);
router.post(
  '/',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  validateStoreBody,
  validationRequests,
  storesController.createStore
);

router.get('/:id', validateStoreId, validationRequests, storesController.getStoreById);
router.put(
  '/:id',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  [...validateStoreId, ...validateStoreBody],
  validationRequests,
  storesController.updateStore
);
router.delete(
  '/:id',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  storesController.deleteStore
);

module.exports = router;

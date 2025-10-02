const express = require('express');
const router = express.Router();

const storesController = require('../controllers/stores.controller');
const { authenticate, authorizeAdminOrEmployee } = require('../middleware/auth');


router.get('/', storesController.getAllStores);
router.post('/'/*, authenticate, authorizeAdminOrEmployee*/, storesController.createStore);


router.get('/:id', storesController.getStoreById);
router.put('/:id'/*, authenticate, authorizeAdminOrEmployee*/, storesController.updateStore);
router.delete('/:id'/*, authenticate, authorizeAdminOrEmployee*/, storesController.deleteStore);

module.exports = router;
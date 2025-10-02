const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const validationRequests = require('../middleware/validationRequests');
const {
  validateProductId,
  validateProductBody,
} = require('../middleware/productValidation');
const { authorizeAdminOrEmployee } = require('../middleware/auth');

console.log(typeof productsController.updateProductById); // should be 'function'
console.log(Array.isArray(validateProductId)); // should be true

router.get('/', productsController.getAllProducts);

router.get(
  '/:id',
  validateProductId,
  validationRequests,
  productsController.getProductById
);

router.post(
  '/',
  authorizeAdminOrEmployee,
  validateProductBody,
  validationRequests,
  productsController.createNewProduct
);

router.put(
  '/:id',
  authorizeAdminOrEmployee,
  [...validateProductId, ...validateProductBody],
  validationRequests,
  productsController.updateProductById
);

router.delete(
  '/:id',
  authorizeAdminOrEmployee,
  validateProductId,
  validationRequests,
  productsController.deleteProductById
);

module.exports = router;

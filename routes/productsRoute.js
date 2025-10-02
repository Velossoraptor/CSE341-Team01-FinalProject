const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { body, param, validationResult } = require('express-validator');

// Middleware to handle validation results
const validationRequests = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Handle GET request to fetch all products
router.get('/', productsController.getAllProducts);

// Handle GET request to fetch a product by ID with validation
router.get(
  '/:id',
  param('id').isMongoId().withMessage('Invalid product ID'),
  validationRequests,
  productsController.getProductById
);

// Handle POST request to create a new product with validation
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('inStock').isBoolean().withMessage('In stock must be a boolean'),
    body('category').notEmpty().withMessage('Category is required'),
    body('tag').notEmpty().withMessage('Tag is required'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('accountType').notEmpty().withMessage('Account type is required'),
  ],
  validationRequests,
  productsController.createNewProduct
);

// Handle PUT request to update a product by ID with validation
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid product ID'),
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('inStock').isBoolean().withMessage('In stock must be a boolean'),
    body('category').notEmpty().withMessage('Category is required'),
    body('tag').notEmpty().withMessage('Tag is required'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('accountType').notEmpty().withMessage('Account type is required'),
  ],
  validationRequests,
  productsController.updateProductById
);

module.exports = router;

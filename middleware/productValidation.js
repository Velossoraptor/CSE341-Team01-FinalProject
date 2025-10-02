const { param, body } = require('express-validator');

exports.validateProductId = [
  param('id').isMongoId().withMessage('Invalid product ID'),
];

exports.validateProductBody = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('description').notEmpty().withMessage('Description is required'),
  body('inStock').isBoolean().withMessage('In stock must be a boolean'),
  body('category').notEmpty().withMessage('Category is required'),
  body('tag').notEmpty().withMessage('Tag is required'),
  body('brand').notEmpty().withMessage('Brand is required'),
  body('accountType').notEmpty().withMessage('Account type is required'),
];

const { param, body } = require('express-validator');

exports.validateStoreId = [
  param('id').isMongoId().withMessage('Invalid store ID'),
];

exports.validateStoreBody = [
  body('name').notEmpty().withMessage('Store name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').optional().withMessage('City is required'),
  body('state')
    .optional()
    .isLength({ min: 2, max: 2 })
    .withMessage('State must be 2 characters'),
  body('zipCode').optional().isPostalCode('US').withMessage('Invalid ZIP code'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('email').optional().isEmail().withMessage('Invalid email address'),
];

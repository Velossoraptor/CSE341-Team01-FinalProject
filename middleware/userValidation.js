const { param, body } = require('express-validator');

exports.validateUserId = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];

exports.validateUserBody = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('roles').optional().isArray().withMessage('Roles must be an array'),
  body('googleId').optional().isString().withMessage('Google ID must be a string'),
  body('profilePicture').optional().isURL().withMessage('Profile picture must be a valid URL'),
];
const { param, body } = require('express-validator');

exports.validateEmployeeId = [
  param('id').isMongoId().withMessage('Invalid employee ID'),
];

exports.validateEmployeeBody = [
  body('employeeId').notEmpty().withMessage('employeeId is required'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  body('hireDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid hire date format'),
];

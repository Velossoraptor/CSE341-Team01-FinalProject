const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees.controller');
const { authorizeAdminOrEmployee } = require('../middleware/auth');
const { verifyGoogleToken } = require('../middleware/VerifyGoogleToken');

router.get('/', employeesController.getAllEmployees);

router.post(
  '/',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  employeesController.createEmployee
);

router.get('/:id', employeesController.getEmployeeById);
router.put(
  '/:id',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  employeesController.updateEmployee
);
router.delete(
  '/:id',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  employeesController.deleteEmployee
);

module.exports = router;

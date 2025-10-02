const express = require('express');
const router = express.Router();

const employeesController = require('../controllers/employees.controller');
const { authenticate, authorizeAdminOrEmployee } = require('../middleware/auth');


router.get('/', employeesController.getAllEmployees);
router.post('/'/*, authenticate, authorizeAdminOrEmployee*/, employeesController.createEmployee);


router.get('/:id', employeesController.getEmployeeById);
router.put('/:id'/*, authenticate, authorizeAdminOrEmployee*/, employeesController.updateEmployee);
router.delete('/:id'/*, authenticate, authorizeAdminOrEmployee*/, employeesController.deleteEmployee);

module.exports = router;
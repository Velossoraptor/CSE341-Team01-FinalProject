const Employee = require('../models/employee');

// GET all employees
const getAllEmployees = async (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Get all employees'
    #swagger.description = 'Returns a list of all active employees with populated store information.'
    #swagger.responses[200] = {
      description: 'List of employees retrieved successfully',
    }
    #swagger.responses[500] = {
      description: 'Server error'
    }
  */
  try {
    const employees = await Employee.find({ isActive: true }).populate('storeId', 'name location');
    const ordered = employees.map((e) => {
      const obj = e.toObject();
      const { _id, ...rest } = obj;
      return { _id, ...rest };
    });
    res.json(ordered);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees.', error: err.message });
  }
};

// GET employee by ID
const getEmployeeById = async (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Get employee by ID'
    #swagger.description = 'Retrieves a specific employee by their ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Employee ID',
      required: true,
      type: 'string'
    }
  */
  try {
    const employee = await Employee.findById(req.params.id).populate('storeId', 'name location');
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    const obj = employee.toObject();
    const { _id, ...rest } = obj;
    res.json({ _id, ...rest });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employee.', error: err.message });
  }
};

// POST create new employee
const createEmployee = async (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Create a new employee'
    #swagger.description = 'Creates a new employee with the provided information.'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Employee object to create',
      required: ['employeeId', 'firstName', 'lastName', 'email', 'phone', 'position', 'department', 'storeId', 'salary', 'hireDate'],
      schema: {
        employeeId: 'string',
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        phone: 'string',
        position: 'string',
        department: 'string',
        storeId: 'string',
        salary: 65000,
        hireDate: 'string',
        address: {
          street: 'string',
          city: 'string',
          state: 'string',
          zipCode: 'string',
          country: 'string'
        },
        emergencyContact: {
          name: 'string',
          phone: 'string',
          relationship: 'string'
        }
      }
    }
  */
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Employee ID or email already exists.' });
    }
    res.status(400).json({ message: 'Error creating employee.', error: err.message });
  }
};

// PUT update employee
const updateEmployee = async (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Update an employee'
    #swagger.description = 'Updates an existing employee with the provided information.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Employee ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Employee object with updated fields',
      required: true,
      schema: {
        employeeId: 'string',
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        phone: 'string',
        position: 'string',
        department: 'string',
        storeId: 'string',
        salary: 65000,
        hireDate: 'string',
        address: {
          street: 'string',
          city: 'string',
          state: 'string',
          zipCode: 'string',
          country: 'string'
        },
        emergencyContact: {
          name: 'string',
          phone: 'string',
          relationship: 'string'
        }
      }
    }
  */
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, updatedAt: Date.now() }, 
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: 'Error updating employee.', error: err.message });
  }
};

// DELETE employee
const deleteEmployee = async (req, res) => {
  /*
    #swagger.tags = ['Employees']
    #swagger.summary = 'Delete an employee'
    #swagger.description = 'Deletes an employee by their ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Employee ID',
      required: true,
      type: 'string'
    }
  */
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found.' });
    res.json({ message: 'Employee deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee.' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employees.controller');

const Employee = require('../models/employee');
jest.mock('../models/employee');

describe('Employee Controller', () => {
  test('getAllEmployees returns active employees', async () => {
    const mockEmployees = [
      {
        toObject: () => ({
          _id: '1',
          firstName: 'John',
          storeId: { name: 'Store A', location: 'Accra' },
        }),
      },
      {
        toObject: () => ({
          _id: '2',
          firstName: 'Jane',
          storeId: { name: 'Store B', location: 'Kasoa' },
        }),
      },
    ];

    Employee.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockEmployees),
    });

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getAllEmployees(req, res);

    expect(res.json).toHaveBeenCalledWith([
      {
        _id: '1',
        firstName: 'John',
        storeId: { name: 'Store A', location: 'Accra' },
      },
      {
        _id: '2',
        firstName: 'Jane',
        storeId: { name: 'Store B', location: 'Kasoa' },
      },
    ]);
  });

  test('getEmployeeById returns employee by ID', async () => {
    const mockEmployee = {
      toObject: () => ({
        _id: '1',
        firstName: 'John',
        storeId: { name: 'Store A', location: 'Accra' },
      }),
    };

    Employee.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockEmployee),
    });

    const req = { params: { id: '1' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getEmployeeById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      _id: '1',
      firstName: 'John',
      storeId: { name: 'Store A', location: 'Accra' },
    });
  });

  test('createEmployee saves new employee', async () => {
    const mockEmployee = {
      save: jest.fn().mockResolvedValue({ firstName: 'Jane', employeeId: 'E001' }),
    };

    const req = { body: { firstName: 'Jane', employeeId: 'E001' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Employee.mockImplementation(() => mockEmployee);

    await createEmployee(req, res);

    expect(mockEmployee.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ firstName: 'Jane', employeeId: 'E001' });
  });

  test('updateEmployee modifies employee by ID', async () => {
    const updated = { firstName: 'Updated', employeeId: 'E001' };

    const req = { params: { id: '1' }, body: { firstName: 'Updated' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Employee.findByIdAndUpdate.mockResolvedValue(updated);

    await updateEmployee(req, res);

    expect(Employee.findByIdAndUpdate).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test('deleteEmployee removes employee by ID', async () => {
    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Employee.findByIdAndDelete.mockResolvedValue({ _id: '1' });

    await deleteEmployee(req, res);

    expect(Employee.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Employee deleted successfully.' });
  });
});

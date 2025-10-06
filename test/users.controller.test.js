const { Allusers, upgradeToAdmin } = require('../controllers/users.controller');
const User = require('../models/user');


jest.mock('../models/user');

test('should return users with status 200', async () => {
  const req = {}; 
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const mockUsers = [{ name: 'Alice' }, { name: 'Bob' }];
  User.find.mockResolvedValue(mockUsers);

  await Allusers(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: 'Users retrieved',
    users: mockUsers,
  });
});

test('should return 500 on error', async () => {
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  User.find.mockRejectedValue(new Error('DB error'));

  await Allusers(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({
    error: 'DB error',
  });
});


test('should upgrade user to admin with correct code', async () => {
  process.env.ADMIN_CODE = 'secret123';

  const mockUser = {
    email: 'test@example.com',
    roles: ['customer'],
    save: jest.fn(),
  };
  User.findOne.mockResolvedValue(mockUser);

  const req = {
    body: { adminCode: 'secret123' },
    user: { email: 'test@example.com' },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await upgradeToAdmin(req, res);

  
  expect(mockUser.save).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: 'Role upgraded to admin',
    roles: ['admin'],
  });
});

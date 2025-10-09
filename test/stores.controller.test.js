const {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
} = require('../controllers/stores.controller');

const Store = require('../models/store');
jest.mock('../models/store');

describe('Store Controller', () => {
  test('getAllStores returns active stores', async () => {
    const mockStores = [
      {
        toObject: () => ({
          _id: '1',
          name: 'Store A',
          managerId: { firstName: 'John', lastName: 'Doe', position: 'Manager' },
        }),
      },
      {
        toObject: () => ({
          _id: '2',
          name: 'Store B',
          managerId: { firstName: 'Jane', lastName: 'Smith', position: 'Manager' },
        }),
      },
    ];

    Store.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockStores),
    });

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getAllStores(req, res);

    expect(res.json).toHaveBeenCalledWith({
      data: [
        {
          _id: '1',
          name: 'Store A',
          managerId: { firstName: 'John', lastName: 'Doe', position: 'Manager' },
          operatingHours: undefined
        },
        {
          _id: '2',
          name: 'Store B',
          managerId: { firstName: 'Jane', lastName: 'Smith', position: 'Manager' },
          operatingHours: undefined
        },
      ]
    });
  });

  test('getStoreById returns store by ID', async () => {
    const mockStore = {
      toObject: () => ({
        _id: '1',
        name: 'Store A',
        managerId: { firstName: 'John', lastName: 'Doe', position: 'Manager' },
      }),
    };

    Store.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockStore),
    });

    const req = { params: { id: '1' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await getStoreById(req, res);

    expect(res.json).toHaveBeenCalledWith({
      _id: '1',
      name: 'Store A',
      managerId: { firstName: 'John', lastName: 'Doe', position: 'Manager' },
    });
  });

  test('createStore saves new store', async () => {
    const mockStore = {
      save: jest.fn().mockResolvedValue({
        toObject: () => ({
          _id: '1',
          name: 'New Store',
          location: 'Kasoa',
        }),
      }),
    };

    const req = { body: { name: 'New Store', location: 'Kasoa' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Store.mockImplementation(() => mockStore);

    await createStore(req, res);

    expect(mockStore.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: '1',
      name: 'New Store',
      location: 'Kasoa',
    });
  });

  test('updateStore modifies store by ID', async () => {
    const updated = {
      toObject: () => ({
        _id: '1',
        name: 'Updated Store',
        location: 'Accra',
      }),
    };

    const req = { params: { id: '1' }, body: { name: 'Updated Store' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Store.findByIdAndUpdate.mockResolvedValue(updated);

    await updateStore(req, res);

    expect(Store.findByIdAndUpdate).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      _id: '1',
      name: 'Updated Store',
      location: 'Accra',
    });
  });

  test('deleteStore removes store by ID', async () => {
    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Store.findByIdAndDelete.mockResolvedValue({ _id: '1' });

    await deleteStore(req, res);

    expect(Store.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Store deleted successfully.' });
  });
});

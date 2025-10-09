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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllStores returns active stores', async () => {
    const mockStores = [
      {
        toObject: () => ({
          _id: '1',
          name: 'Store A',
          location: 'Accra',
          operatingHours: { monday: { open: '08:00', close: '18:00' } },
        }),
      },
      {
        toObject: () => ({
          _id: '2',
          name: 'Store B',
          location: 'Kasoa',
          operatingHours: { monday: { open: '09:00', close: '17:00' } },
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
          location: 'Accra',
          operatingHours: { monday: { open: '08:00', close: '18:00' } },
        },
        {
          _id: '2',
          name: 'Store B',
          location: 'Kasoa',
          operatingHours: { monday: { open: '09:00', close: '17:00' } },
        },
      ],
    });
  });

  test('getStoreById returns store when found', async () => {
    const mockStore = {
      toObject: () => ({
        _id: '1',
        name: 'Store A',
        location: 'Accra',
        operatingHours: { monday: { open: '08:00', close: '18:00' } },
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
      location: 'Accra',
      operatingHours: { monday: { open: '08:00', close: '18:00' } },
    });
  });

  test('createStore saves new store', async () => {
    const mockStore = {
      save: jest.fn().mockResolvedValue({
        toObject: () => ({
          _id: '3',
          name: 'New Store',
          location: 'Tema',
        }),
      }),
    };

    const req = { body: { name: 'New Store', location: 'Tema' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Store.mockImplementation(() => mockStore);

    await createStore(req, res);

    expect(mockStore.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: '3',
      name: 'New Store',
      location: 'Tema',
    });
  });

  test('updateStore modifies store by ID', async () => {
    const updatedStore = {
      toObject: () => ({
        _id: '1',
        name: 'Updated Store',
        location: 'Accra',
        updatedAt: Date.now(),
      }),
    };

    const req = {
      params: { id: '1' },
      body: { name: 'Updated Store', location: 'Accra' },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Store.findByIdAndUpdate.mockResolvedValue(updatedStore);

    await updateStore(req, res);

    expect(Store.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      {
        name: 'Updated Store',
        location: 'Accra',
        updatedAt: expect.any(Number),
      },
      { new: true, runValidators: true }
    );

    expect(res.json).toHaveBeenCalledWith({
      _id: '1',
      name: 'Updated Store',
      location: 'Accra',
      updatedAt: expect.any(Number),
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
    expect(res.json).toHaveBeenCalledWith({
      message: 'Store deleted successfully.',
    });
  });
});

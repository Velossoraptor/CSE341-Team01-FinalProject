const Store = require('../models/store');

// GET all stores
const getAllStores = async (req, res) => {
  /*
    #swagger.tags = ['Stores']
    #swagger.summary = 'Get all stores'
    #swagger.description = 'Returns a list of all active stores.'
  */
  try {
    const stores = await Store.find({ isActive: true }).populate('managerId', 'firstName lastName position');
    const orderedStores = stores.map((s) => {
      const obj = s.toObject();
      const { _id, operatingHours, ...rest } = obj;
      return { _id, ...rest, operatingHours };
    });
    res.json({ data: orderedStores });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stores.', error: err.message });
  }
};

// GET store by ID
const getStoreById = async (req, res) => {
  /*
   #swagger.tags = ['Stores']
   #swagger.summary = 'Get store by ID'
   #swagger.description = 'Returns a store by its ID.'
    }
  */
  try {
    const store = await Store.findById(req.params.id).populate('managerId', 'firstName lastName position');
    if (!store) return res.status(404).json({ message: 'Store not found.' });
    const obj = store.toObject();
    const { _id, operatingHours, ...rest } = obj;
    res.json({ _id, ...rest, operatingHours });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching store.', error: err.message });
  }
};

// POST create new store
const createStore = async (req, res) => {
  /*
    #swagger.tags = ['Stores']
    #swagger.summary = 'Create a new store'
    #swagger.description = 'Creates a new store with the provided information.'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Store object',
      required: true,
      schema: {
          name: 'string',
          location: 'string',
          address: {
            street: 'string',
            city: 'string',
            state: 'string',
            zipCode: 'string',
            country: 'string'
          },
          phone: 'string',
          email: 'string',
          managerId: 'string',
          isActive: true,
          storeType: 'string',
          capacity: 200,
          operatingHours: {
            monday: { open: 'string', close: 'string' },
            tuesday: { open: 'string', close: 'string' },
            wednesday: { open: 'string', close: 'string' },
            thursday: { open: 'string', close: 'string' },
            friday: { open: 'string', close: 'string' },
            saturday: { open: 'string', close: 'string' },
            sunday: { open: 'string', close: 'string' }
          }
        }
    }
  */
  try {
    const store = new Store(req.body);
    const savedStore = await store.save();
    const obj = savedStore.toObject();
    const { _id, ...rest } = obj;
    res.status(201).json({ _id, ...rest });
  } catch (err) {
    res.status(400).json({ message: 'Error creating store.', error: err.message });
  }
};

// PUT update store
const updateStore = async (req, res) => {
  /*
    #swagger.tags = ['Stores']
    #swagger.summary = 'Update an existing store'
    #swagger.description = 'Updates a store with the provided information.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Store ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Store object',
      required: true,
      schema: {
          name: 'string',
          location: 'string',
          address: {
            street: 'string',
            city: 'string',
            state: 'string',
            zipCode: 'string',
            country: 'string'
          },
          phone: 'string',
          email: 'string',
          managerId: 'string',
          isActive: true,
          storeType: 'string',
          capacity: 200,
          operatingHours: {
            monday: { open: 'string', close: 'string' },
            tuesday: { open: 'string', close: 'string' },
            wednesday: { open: 'string', close: 'string' },
            thursday: { open: 'string', close: 'string' },
            friday: { open: 'string', close: 'string' },
            saturday: { open: 'string', close: 'string' },
            sunday: { open: 'string', close: 'string' }
          }
        }
    }
  */
  try {
    const store = await Store.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!store) return res.status(404).json({ message: 'Store not found.' });
    const obj = store.toObject();
    const { _id, ...rest } = obj;
    res.json({ _id, ...rest });
  } catch (err) {
    res.status(400).json({ message: 'Error updating store.', error: err.message });
  }
};

// DELETE store
const deleteStore = async (req, res) => {
  /*
    #swagger.tags = ['Stores']
    #swagger.summary = 'Delete a store'
    #swagger.description = 'Deletes a store by its ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Store ID',
      required: true,
      type: 'string'
    }
  */
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) return res.status(404).json({ message: 'Store not found.' });
    res.json({ message: 'Store deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting store.' });
  }
};

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
};
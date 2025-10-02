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
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stores.', error: err.message });
  }
};

// GET store by ID
const getStoreById = async (req, res) => {
  /*
    #swagger.tags = ['Stores']
    #swagger.summary = 'Get store by ID'
    #swagger.description = 'Retrieves a specific store by its ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Store ID',
      required: true,
      type: 'string'
    }
  */
  try {
    const store = await Store.findById(req.params.id).populate('managerId', 'firstName lastName position');
    if (!store) return res.status(404).json({ message: 'Store not found.' });
    res.json(store);
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
        type: 'object',
        properties: {
          name: 'string',
          location: 'string',
          address: 'object',
          phone: 'string',
          email: 'string',
          managerId: 'string',
          storeType: 'string',
          capacity: 'number'
        }
      }
    }
  */
  try {
    const store = new Store(req.body);
    const savedStore = await store.save();
    res.status(201).json(savedStore);
  } catch (err) {
    res.status(400).json({ message: 'Error creating store.', error: err.message });
  }
};

// PUT update store
const updateStore = async (req, res) => {
  /*
    #swagger.tags = ['Stores']
    #swagger.summary = 'Update a store'
    #swagger.description = 'Updates an existing store with the provided information.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Store ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Store object with updated fields',
      required: true,
      schema: {
        type: 'object',
        properties: {
          name: 'string',
          location: 'string',
          address: 'object',
          phone: 'string',
          email: 'string',
          managerId: 'string',
          storeType: 'string',
          capacity: 'number'
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
    res.json(store);
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
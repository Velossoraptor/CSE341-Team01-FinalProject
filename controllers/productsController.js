const Product = require('../models/ProductsModel');

const products = {};

// Get all products
products.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res
      .status(200)
      .json({ message: 'Products retrieved successfully', data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
products.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res
      .status(200)
      .json({ message: 'Product retrieved successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post new product with duplicate name check
products.createNewProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({ name: req.body.name });

    // If product with the same name exists, return a 409 Conflict response
    if (existingProduct) {
      return res
        .status(409)
        .json({ message: 'Product with this name already exists' });
    }

    // If no duplicate, proceed to create the new product
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      inStock: req.body.inStock,
      category: req.body.category,
      tag: req.body.tag,
      brand: req.body.brand,
      accountType: req.body.accountType,
    });

    const result = await newProduct.save();

    if (!result) {
      return res
        .status(400)
        .json({ message: 'Product was not created successfully' });
    }
    res
      .status(201)
      .json({ message: 'Product created successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product by ID function with validation
products.updateProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    // Check if name being updated already exists
    if (req.body.name) {
      const existingProduct = await Product.findOne({
        name: req.body.name,
        _id: { $ne: req.params.id },
      });

      if (existingProduct) {
        return res.status(409).json({
          error: 'Product already exists',
          message: 'A product with this name already exists in the store',
        });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    //  Check for truthy
    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        message: 'No product found with the provided ID',
      });
    }

    //  Update the record
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    if (error.code === 11000) {
      res.status(409).json({
        error: 'Duplicate entry',
        message: 'A product with this name already exists',
      });
    } else {
      res.status(500).json({
        error: 'Failed to update product',
        message: 'An error occurred while updating the product',
      });
    }
  }
};

module.exports = products;

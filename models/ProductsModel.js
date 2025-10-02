const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  category: { type: String, required: true },
  tag: { type: String },
  brand: { type: String },
  accountType: { type: String, default: 'admin' },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

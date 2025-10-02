const express = require('express');
const router = express.Router(); // Create a router instance
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const { authorizeAdminOrEmployee } = require('../middleware/auth');
const { verifyGoogleToken } = require('../middleware/verifyGoogleToken');

const { authenticate } = require('../middleware/auth');

const Product = require('../models/product');
const User = require('../models/user');

// Route imports
const employeesRoutes = require('./employees');
const storesRoutes = require('./stores');


var options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.get('/', (req, res) => {
  res.send('Hello World! type /api-docs to see documentation');
});

// Use route modules
router.use('/employees', employeesRoutes);
router.use('/stores', storesRoutes);

router.delete(
  '/products/:id',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product)
        return res.status(404).json({ message: 'Product not found.' });
      res.json({ message: 'Product deleted successfully.' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting product.' });
    }
  }
);

router.delete(
  '/users/:id',
  verifyGoogleToken,
  authorizeAdminOrEmployee,
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found.' });
      res.json({ message: 'User deleted successfully.' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user.' });
    }
  }
);


delete swaggerDocument.paths['/auth/google'];
delete swaggerDocument.paths['/auth/google/callback'];

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

module.exports = router;



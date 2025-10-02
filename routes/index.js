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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message and API docs link
 *     description: Returns a welcome message and instructions to access Swagger docs.
 *     responses:
 *       200:
 *         description: Success
 */

var options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.get('/', (req, res) => {
  res.send('Hello World! type /api-docs to see documentation');
});

// Use route modules
router.use('/employees', employeesRoutes);
router.use('/stores', storesRoutes);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product by ID. Requires admin or employee authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Forbidden: insufficient privileges
 *       404:
 *         description: Product not found
 */
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by ID. Requires admin or employee authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Forbidden: insufficient privileges
 *       404:
 *         description: User not found
 */
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

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     description: Returns a list of all products.
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     description: Creates a new product. Requires admin or employee authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Forbidden: insufficient privileges
 *
 * # TODO: Implement GET and POST /products
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Returns a list of all users. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Forbidden: insufficient privileges
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Creates a new user. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Forbidden: insufficient privileges
 *
 * # TODO: Implement GET and POST /users
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update a product
 *     description: Updates a product by ID. Requires admin or employee authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Forbidden: insufficient privileges
 *       404:
 *         description: Product not found
 *
 * # TODO: Implement PUT /products/{id}
 */

/**




/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update a user
 *     description: Updates a user by ID. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Forbidden: insufficient privileges
 *       404:
 *         description: User not found
 *
 * # TODO: Implement PUT /users/{id}
 */

delete swaggerDocument.paths['/auth/google'];
delete swaggerDocument.paths['/auth/google/callback'];

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

module.exports = router;

// I've created middleware
// Created auth.js
//The authenticate and authorizeAdminOrEmployee middleware have been created in auth.js.
//authenticate checks for a valid JWT token in the Authorization header.
//authorizeAdminOrEmployee ensures the user has either the admin or employee role.

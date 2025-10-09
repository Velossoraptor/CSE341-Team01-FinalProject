const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const { connectDb } = require('./db/connect');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/productsRoute');
const employeesRoute = require('./routes/employees');
const storesRoute = require('./routes/stores');

dotenv.config();

delete swaggerDocument.paths['/auth/google'];
delete swaggerDocument.paths['/auth/google/callback'];

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Routes Mount
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/employees', employeesRoute);
app.use('/stores', storesRoute);

//Api Doc
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      withCredentials: true,
      persistAuthorization: true,
    },
  })
);

const PORT = process.env.PORT || 3300;

// Export the app for testing
module.exports = app;

// Start server only if this file is run directly
if (require.main === module) {
  connectDb()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ Failed to connect to MongoDB:', err.message);
    });
}

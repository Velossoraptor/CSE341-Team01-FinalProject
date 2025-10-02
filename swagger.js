swaggerAutogen(outputFile, endpointsFiles, doc);
swaggerAutogen(outputFile, routes, doc);

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Simple Marketplace API',
    description: 'Team 01 Final Project - CSE 341',
  },
  host: process.env.HOST || 'localhost:3300',
  schemes: ['http'],
  tags: [
    {
      name: 'Users',
      description: 'User management endpoints'
    },
    {
      name: 'Employees',
      description: 'Employee management endpoints'
    },
    {
      name: 'Stores',
      description: 'Store management endpoints'
    },
    {
      name: 'Products',
      description: 'Product management endpoints'
    },
    {
      name: 'Authentication',
      description: 'Authentication and authorization endpoints'
    }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './routes/index.js',
  './routes/employees.js',
  './routes/stores.js',
  './app.js'
];

// Only one call to swaggerAutogen is needed
swaggerAutogen(outputFile, endpointsFiles, doc);


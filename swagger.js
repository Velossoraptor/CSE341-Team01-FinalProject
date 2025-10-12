const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');
dotenv.config();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

const doc = {
  info: {
    title: 'Simple Marketplace API',
    description: 'Team 01 Final Project - CSE 341',
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:3300',
  basePath: '/',
  schemes: [process.env.RENDER_EXTERNAL_HOSTNAME ? 'https' : 'http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    { name: 'Users', description: 'User management endpoints' },
    { name: 'Employees', description: 'Employee management endpoints' },
    { name: 'Stores', description: 'Store management endpoints' },
    { name: 'Products', description: 'Product management endpoints' },
    {
      name: 'Authentication',
      description: 'Authentication and authorization endpoints',
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};

// Only one call to swaggerAutogen is needed
swaggerAutogen(outputFile, endpointsFiles, doc);

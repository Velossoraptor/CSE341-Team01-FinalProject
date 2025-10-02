const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Simple Marketplace API',
    description: 'Team 01 Final Project - CSE 341'
  },
  host: process.env.HOST || 'localhost:3300',
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
  ]
};
 

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './routes/index.js', './app.js'
];

/* NOTE: Including all route files to ensure Swagger picks up all endpoint documentation */

swaggerAutogen(outputFile, endpointsFiles, doc);
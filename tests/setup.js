// Test setup file to handle database connections properly
const mongoose = require('mongoose');

// Only mock for integration tests, not unit tests
const testPath = expect.getState().testPath;
if (testPath && testPath.includes('tests/')) {
  jest.mock('../db/connect', () => ({
    connectDb: jest.fn().mockResolvedValue(true)
  }));
}

// Set up test environment
beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  jest.setTimeout(15000);
});

// Clean up after all tests
afterAll(async () => {
  // Close any open database connections
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

// Clean up after each test
afterEach(async () => {
  jest.clearAllTimers();
});
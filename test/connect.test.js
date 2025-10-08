const mongoose = require('mongoose');
const { connectDb } = require('../db/connect');

jest.mock('mongoose');

describe('Database Connection', () => {
  test('connectDb connects successfully', async () => {
    mongoose.connect.mockResolvedValue();

    await expect(connectDb()).resolves.not.toThrow();
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  test('connectDb throws error on failure', async () => {
    mongoose.connect.mockRejectedValue(new Error('Connection failed'));

    await expect(connectDb()).rejects.toThrow('Connection failed');
  });
});

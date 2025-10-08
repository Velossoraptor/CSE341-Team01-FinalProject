const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Products API - GET Endpoints', () => {
  // Test GET /products
  describe('GET /products', () => {
    it('should return all products', async () => {
      const res = await request(app)
        .get('/products')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should return products with correct structure', async () => {
      const res = await request(app)
        .get('/products')
        .expect(200);

      if (res.body.length > 0) {
        const product = res.body[0];
        expect(product).toHaveProperty('_id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('description');
      }
    });
  });

  // Test GET /products/:id
  describe('GET /products/:id', () => {
    it('should return 400 for invalid product ID', async () => {
      const res = await request(app)
        .get('/products/invalid-id')
        .expect(400);

      expect(res.body).toHaveProperty('errors');
    });

    it('should return 404 for non-existent product ID', async () => {
      const validObjectId = new mongoose.Types.ObjectId().toString();
      await request(app)
        .get(`/products/${validObjectId}`)
        .expect(404);
    });
  });
});

// Clean up after tests
afterAll(async () => {
  // Don't close the connection as it might affect the running app
  // await mongoose.connection.close();
});
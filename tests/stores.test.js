const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Stores API - GET Endpoints', () => {
  describe('GET /stores', () => {
    it('should return all stores', async () => {
      const res = await request(app)
        .get('/stores')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should return stores with correct structure', async () => {
      const res = await request(app)
        .get('/stores')
        .expect(200);

      if (res.body.length > 0) {
        const store = res.body[0];
        expect(store).toHaveProperty('_id');
        expect(store).toHaveProperty('name');
        expect(store).toHaveProperty('address');
      }
    });
  });

  describe('GET /stores/:id', () => {
    it('should return 400 for invalid store ID', async () => {
      const res = await request(app)
        .get('/stores/invalid-id')
        .expect(400);

      expect(res.body).toHaveProperty('errors');
    });

    it('should return 404 for non-existent store ID', async () => {
      const validObjectId = new mongoose.Types.ObjectId().toString();
      await request(app)
        .get(`/stores/${validObjectId}`)
        .expect(404);
    });
  });
});

afterAll(async () => {
  // Clean up resources if needed
});
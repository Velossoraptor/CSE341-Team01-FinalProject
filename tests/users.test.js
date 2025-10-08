const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Users API - GET Endpoints', () => {
  // Note: Users endpoints require authentication, these tests check auth protection
  
  describe('GET /users', () => {
    it('should return 401 when no authentication token provided', async () => {
      const res = await request(app)
        .get('/users')
        .expect(401);

      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /users/:id', () => {
    it('should return 401 when no authentication token provided', async () => {
      const validObjectId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .get(`/users/${validObjectId}`)
        .expect(401);

      expect(res.body).toHaveProperty('message');
    });

    it('should return 400 for invalid user ID format', async () => {
      const res = await request(app)
        .get('/users/invalid-id')
        .expect(400);

      expect(res.body).toHaveProperty('errors');
    });
  });
});

afterAll(async () => {
  // Clean up resources if needed
});
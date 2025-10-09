const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Users API - GET Endpoints', () => {
  // Note: Users endpoints require authentication, these tests check auth protection
  
  describe('GET /user', () => {
    it('should return 401 when no authentication token provided', async () => {
      const res = await request(app)
        .get('/user')
        .expect(401);

      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /user/:id', () => {
    it('should return 401 when no authentication token provided', async () => {
      const validObjectId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .get(`/user/${validObjectId}`)
        .expect(401);

      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 for invalid user ID format', async () => {
      const res = await request(app)
        .get('/user/invalid-id')
        .expect(400);

      expect(res.body).toHaveProperty('errors');
    });
  });
});

afterAll(async () => {
  // Clean up resources if needed
});
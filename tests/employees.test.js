const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Employees API - GET Endpoints', () => {
  describe('GET /employees', () => {
    it('should return all employees', async () => {
      const res = await request(app)
        .get('/employees')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should return employees with correct structure', async () => {
      const res = await request(app)
        .get('/employees')
        .expect(200);

      if (res.body.length > 0) {
        const employee = res.body[0];
        expect(employee).toHaveProperty('_id');
        expect(employee).toHaveProperty('name');
        expect(employee).toHaveProperty('email');
      }
    });
  });

  describe('GET /employees/:id', () => {
    it('should return 400 for invalid employee ID', async () => {
      const res = await request(app)
        .get('/employees/invalid-id')
        .expect(400);

      expect(res.body).toHaveProperty('errors');
    });

    it('should return 404 for non-existent employee ID', async () => {
      const validObjectId = new mongoose.Types.ObjectId().toString();
      await request(app)
        .get(`/employees/${validObjectId}`)
        .expect(404);
    });
  });
});

afterAll(async () => {
  // Clean up resources if needed
});
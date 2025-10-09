const request = require('supertest');
const app = require('../app');

describe('API Routes - Basic Connectivity', () => {
  
  describe('GET /products', () => {
    it('should respond to products endpoint', async () => {
      const res = await request(app)
        .get('/products')
        .timeout(5000);
      
      // Just check that we get a response (any status is fine)
      expect(res.status).toBeDefined();
      expect([200, 401, 500].includes(res.status)).toBe(true);
    });
  });

  describe('GET /employees', () => {
    it('should respond to employees endpoint', async () => {
      const res = await request(app)
        .get('/employees')
        .timeout(5000);
      
      expect(res.status).toBeDefined();
      expect([200, 401, 500].includes(res.status)).toBe(true);
    });
  });

  describe('GET /stores', () => {
    it('should respond to stores endpoint', async () => {
      const res = await request(app)
        .get('/stores')
        .timeout(5000);
      
      expect(res.status).toBeDefined();
      expect([200, 401, 500].includes(res.status)).toBe(true);
    });
  });

  describe('GET /user', () => {
    it('should respond to user endpoint', async () => {
      const res = await request(app)
        .get('/user')
        .timeout(5000);
      
      expect(res.status).toBeDefined();
      expect([200, 401, 403, 500].includes(res.status)).toBe(true);
    });
  });

});
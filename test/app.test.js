const request = require('supertest');
const app = require('../index');

describe('Verificaciones de Servidor y Feature Toggle API', () => {
  it('GET /health debe retornar status 200 y OK', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  it('GET /api/features debe responder con un booleano para darkModeEnabled', async () => {
    const response = await request(app).get('/api/features');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('darkModeEnabled');
    expect(typeof response.body.darkModeEnabled).toBe('boolean');
  });
});
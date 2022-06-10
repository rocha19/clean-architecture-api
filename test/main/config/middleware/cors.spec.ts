import request from 'supertest';
import app from '@/main/config/app';

describe('CORS middleware', () => {
  it('should enable CORS', async () => {
    app.post('/test-cors', (request, response) => {
      response.send();
    });
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*');
  });
});

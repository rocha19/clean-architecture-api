import request from 'supertest';
import app from '@/main/config/app';

describe('Body parser middleware', () => {
  it('should parse body as json', async () => {
    app.post('/test-body-parser', (request, response) => {
      response.send(request.body);
    });
    await request(app)
      .get('/test-body-parser')
      .send({ name: 'Rocha' })
      .expect({ name: 'Rocha' });
  });
});

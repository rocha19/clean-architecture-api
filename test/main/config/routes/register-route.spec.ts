import app from '@/main/config/app';
import request from 'supertest';

describe('Register route', () => {
  it('should return an account on success', async () => {
    app.post('test_cors', (request, response) => {
      response.send();
    });
    await request(app)
      .post('api/register')
      .send({
        name: 'Any name',
        email: 'any@mail.com',
      })
      .expect(201);
  });
});

import type { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const fakeLogin = async (
  app: INestApplication,
  email: string,
  password: string,
) => {
  const response = await request(app.getHttpServer())
    .post('/auth/signin')
    .send({ email, password });

  const cookies = response.headers['set-cookie'];

  return {
    cookies,
  };
};

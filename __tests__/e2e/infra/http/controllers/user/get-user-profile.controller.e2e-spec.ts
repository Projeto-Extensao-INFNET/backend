import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { createFakeUser, fakeLogin } from '__tests__/shared/factories';

describe('Get User Profile (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('[GET] /accounts/me', async () => {
    const user = createFakeUser();

    await request(app.getHttpServer()).post('/auth/signup').send({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      documentType: user.documentType,
      birthDate: user.birthDate,
      document: user.document,
    });

    const { cookies } = await fakeLogin(app, user.email, user.password);

    const getUser = await request(app.getHttpServer())
      .get('/accounts/me')
      .set('Cookie', cookies);

    expect(getUser.statusCode).toBe(200);
    expect(getUser.body).toMatchObject({
      id: expect.any(String),
      name: user.name,
      email: user.email,
      birthDate: user.birthDate.toISOString(),
      role: user.role,
      document: user.document,
    });
  });
});

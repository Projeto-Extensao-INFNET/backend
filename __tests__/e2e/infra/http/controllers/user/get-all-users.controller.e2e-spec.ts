import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { createFakeUser, fakeLogin } from '__tests__/shared/factories';

describe('GetAllUsersController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('[GET] /accounts/users', async () => {
    const user = createFakeUser({ role: 'ADMIN' });

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

    const users = await request(app.getHttpServer())
      .get('/accounts/users')
      .query({
        page: 1,
        limit: 10,
      })
      .set('Cookie', cookies);

    expect(users.statusCode).toBe(200);
    expect(users.body.meta).toHaveProperty('total_items');
    expect(users.body.meta).toHaveProperty('total_pages');
    expect(users.body.meta).toHaveProperty('page');
    expect(users.body.meta).toHaveProperty('limit');
    expect(users.body).toHaveProperty('data');
    expect(users.body.data).toHaveLength(users.body.data.length);
    expect(users.body.meta).toMatchObject({
      ...users.body.meta,
      // valida se fez a conversão de Number -> String ()
      page: expect.any(Number),
      limit: expect.any(Number),
    });
  });
});

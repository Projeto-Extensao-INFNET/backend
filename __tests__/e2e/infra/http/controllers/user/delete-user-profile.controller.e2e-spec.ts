import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { createFakeUser, fakeLogin } from '__tests__/shared/factories';

describe('Delete User Profile (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('[DELETE] /accounts/me', async () => {
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

    const userExists = await request(app.getHttpServer())
      .get('/accounts/me')
      .set('Cookie', cookies);

    const deleteUser = await request(app.getHttpServer())
      .delete('/accounts/me')
      .set('Cookie', cookies);

    const isUserDeleted = await request(app.getHttpServer())
      .get('/accounts/me')
      .set('Cookie', cookies);

    expect(userExists.statusCode).toBe(200);
    expect(deleteUser.statusCode).toBe(200);
    expect(isUserDeleted.statusCode).toBe(404);
  });
});

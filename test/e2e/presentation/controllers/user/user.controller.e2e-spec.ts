import { Test } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { UserController } from '@/presentation/controllers/user/user.controller';

import { createFakeUser, fakeLogin } from '../../../../__shared__/factories';
import { faker } from '@faker-js/faker/locale/pt_BR';

import type { INestApplication } from '@nestjs/common';

describe('UserController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`${UserController.prototype.getAllUsers.name}`, () => {
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
        page: expect.any(Number),
        limit: expect.any(Number),
      });
    });
  });

  describe(`${UserController.prototype.getUserProfile.name}`, () => {
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

  describe(`${UserController.prototype.editProfile.name}`, () => {
    it('[PATCH] /accounts/me', async () => {
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
      const uniqueEmail = faker.internet.email();

      const userExists = await request(app.getHttpServer())
        .get('/accounts/me')
        .set('Cookie', cookies);

      const updateUserProfile = await request(app.getHttpServer())
        .patch('/accounts/me')
        .send({ name: 'Novo Nome', email: uniqueEmail })
        .set('Cookie', cookies);

      expect(userExists.statusCode).toBe(200);
      expect(updateUserProfile.statusCode).toBe(200);
    });
  });

  describe(`${UserController.prototype.deleteUserProfile.name}`, () => {
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

  describe(`${UserController.prototype.uploadAvatar.name}`, () => {
    it.todo('[POST] /accounts/me/avatar', () => {});
  });

  describe(`${UserController.prototype.findById.name}`, () => {
    it.todo('[GET] /accounts/:id', () => {});
  });
});

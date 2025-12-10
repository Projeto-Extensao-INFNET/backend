import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../app.module';
import {
  generateBirthDate,
  generateUniqueCPF,
  generateUniqueEmail,
  generateUniqueName,
} from '@/core/shared/utils';
import { PrismaService } from '@/infra/database/prisma.service';
import {
  makeAuthenticate,
  makeUser,
  makeUserProfessional,
} from '@/test/factories';
import { DOCUMENT_TYPE, ROLE } from '@/core/types';

describe('AuthController (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('SignUp ', () => {
    it('[POST] /auth/signup - should create a new user successfully', async () => {
      const user = {
        name: generateUniqueName(),
        email: generateUniqueEmail(),
        password: '12345678',
        role: ROLE.PATIENT,
        birthDate: generateBirthDate(),
        documentType: DOCUMENT_TYPE.CPF,
        document: generateUniqueCPF(),
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(user);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', user.email);
      expect(response.body).not.toHaveProperty('password');
    });

    describe('SignIn', () => {
      it('[POST] /auth/signin - should return access token with valid credentials', async () => {
        const user = await makeUser(prisma);
        const token = await makeAuthenticate(app, user.email);

        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
      });

      it('[POST] /auth/signin - should return 401 when user try to login with wrong role', async () => {
        const user = await makeUserProfessional(prisma);

        await request(app.getHttpServer()).post('/auth/signup');

        const token = await makeAuthenticate(app, user.email);

        const response = await request(app.getHttpServer())
          .get('/accounts/me')
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
      });
    });

    it('Complete flow: signup then signin', async () => {
      const user = {
        name: generateUniqueName(),
        email: generateUniqueEmail(),
        password: '12345678',
        role: ROLE.PATIENT,
        birthDate: generateBirthDate(),
        documentType: DOCUMENT_TYPE.CPF,
        document: generateUniqueCPF(),
      };

      const signUpResponse = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(user);

      const token = await makeAuthenticate(app, user.email, user.password);

      expect(signUpResponse.statusCode).toBe(201);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });
});

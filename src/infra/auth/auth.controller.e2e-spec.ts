import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../app.module';
import {
  generateBirthDate,
  generateUniqueCPF,
  generateUniqueEmail,
  generateUniqueName,
} from '@/utils';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { makeAuthenticate, makeUser } from '@/shared/factories';
import type { DOCUMENT_TYPE, ROLE } from '@/shared/types';

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
        role: 'PATIENT' as ROLE,
        documentType: 'CPF' as DOCUMENT_TYPE,
        birthDate: generateBirthDate(),
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
    });

    it('Complete flow: signup then signin', async () => {
      const user = {
        name: generateUniqueName(),
        email: generateUniqueEmail(),
        password: '12345678',
        role: 'PATIENT' as ROLE,
        documentType: 'CPF' as DOCUMENT_TYPE,
        birthDate: generateBirthDate(),
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

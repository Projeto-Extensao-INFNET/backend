import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import {
  generateBirthDate,
  generateUniqueCPF,
  generateEmail,
  generateName,
} from '@/utils';
import type { DOCUMENT_TYPE, ROLE } from '@/shared/types';
import { createFakeUser } from 'test/shared/factories';

describe('AuthController (E2E)', () => {
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

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('SignUp ', () => {
    it('[POST] /auth/signup - should create a new user successfully', async () => {
      const user = {
        name: generateName(),
        email: generateEmail(),
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
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('email');
      expect(response.body.data).not.toHaveProperty('password');
    });

    describe('SignIn', () => {
      it('[POST] /auth/signin - should return access and refresh token with valid credentials', async () => {
        // cria um usuário via signup
        const user = createFakeUser();
        await request(app.getHttpServer()).post('/auth/signup').send(user);

        // faz o login
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send({ email: user.email, password: user.password });

        // busca os cookies nos Headers
        const cookies = response.get('Set-Cookie');

        // valida se o accessToken e refreshToken  estão nos cookies
        const hasAccessTokenCookie = cookies?.some((cookie: string) =>
          cookie.startsWith('accessToken='),
        );

        const hasRefreshTokenCookie = cookies?.some((cookie: string) =>
          cookie.startsWith('refreshToken='),
        );

        expect(hasAccessTokenCookie).toBe(true);
        expect(hasRefreshTokenCookie).toBe(true);
      });
    });

    it('Complete flow: signup then signin', async () => {
      const user = {
        name: generateName(),
        email: generateEmail(),
        password: '12345678',
        role: 'PATIENT' as ROLE,
        documentType: 'CPF' as DOCUMENT_TYPE,
        birthDate: generateBirthDate(),
        document: generateUniqueCPF(),
      };

      const signUpResponse = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(user);

      const signInResponse = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: user.email, password: '12345678' });

      expect(signUpResponse.statusCode).toBe(201);
      expect(signInResponse.statusCode).toBe(201);
    });
  });
});

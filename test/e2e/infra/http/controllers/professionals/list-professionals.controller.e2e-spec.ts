import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { createFakeUser, fakeLogin } from '../../../../../__shared__/factories';

describe('List Professionals (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('[GET] /professionals', async () => {
    // cria um usuário
    const user = createFakeUser();

    // cria um profissional
    createFakeUser({ role: 'PROFESSIONAL' });

    // gera e pega o token jwt
    const token = await fakeLogin(app, user.email, user.password);

    // faz a requisição para listar profissionais
    const getProfessional = await request(app.getHttpServer())
      .get('/professionals')
      .set('Authorization', `Bearer ${token}`);

    expect(getProfessional.statusCode).toBe(200);
  });
});

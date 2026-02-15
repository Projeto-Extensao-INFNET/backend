import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '@/infra/database/prisma.service';
import { makeAuthenticate, makeUser, makeProfessional } from '@/test/factories';

describe('List Professionals (E2E)', () => {
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

  it('[GET] /professionals', async () => {
    // cria um usuário
    const user = await makeUser(prisma);

    // cria um profissional
    await makeProfessional(prisma);

    // gera e pega o token jwt
    const token = await makeAuthenticate(app, user.email);

    // faz a requisição para listar profissionais
    const getProfessional = await request(app.getHttpServer())
      .get('/professionals')
      .set('Authorization', `Bearer ${token}`);

    expect(getProfessional.statusCode).toBe(200);
  });
});

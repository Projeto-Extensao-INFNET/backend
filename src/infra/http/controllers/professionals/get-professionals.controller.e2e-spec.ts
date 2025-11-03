import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/infra/database/prisma.service';
import { makeAuthenticate, makeUser } from '@/test/factories';

describe('Get Professionals (E2E)', () => {
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

  it('[GET] /accounts/professionals', async () => {
    const user = await makeUser(prisma);
    const token = await makeAuthenticate(app, user.email);

    const getProfessional = await request(app.getHttpServer())
      .get('/accounts/professionals')
      .set('Authorization', `Bearer ${token}`);

    expect(getProfessional.statusCode).toBe(200);
    expect(getProfessional.body[0]).toHaveProperty('documentType');
  });
});

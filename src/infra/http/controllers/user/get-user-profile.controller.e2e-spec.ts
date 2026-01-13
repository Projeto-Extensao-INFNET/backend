import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '@/infra/database/prisma.service';
import { makeAuthenticate, makeUser } from '@/test/factories';

describe('Get User Profile (E2E)', () => {
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

  it('[GET] /accounts/me', async () => {
    const user = await makeUser(prisma);
    const token = await makeAuthenticate(app, user.email);

    const getUser = await request(app.getHttpServer())
      .get('/accounts/me')
      .set('Authorization', `Bearer ${token}`);

    expect(getUser.statusCode).toBe(200);
    expect(getUser.body).toHaveProperty('name');
  });
});

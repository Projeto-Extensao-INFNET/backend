import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '@/infra/database/prisma.service';
import { makeAuthenticate } from '@/test/factories';
import { makeCreateAdminUser } from '@/test/factories/makeCreateAdminUser';

describe('GetAllUsersController (E2E)', () => {
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

  it('[GET] /accounts/users', async () => {
    const user = await makeCreateAdminUser(prisma);
    const token = await makeAuthenticate(app, user.email);

    const users = await request(app.getHttpServer())
      .get('/accounts/users')
      .set('Authorization', `Bearer ${token}`)
      .query({
        page: 1,
        limit: 10,
      });

    console.log(users.body);
    expect(users.statusCode).toBe(200);
    expect(users.body.meta).toHaveProperty('total_items');
    expect(users.body.meta).toHaveProperty('total_pages');
    expect(users.body.meta).toHaveProperty('page');
    expect(users.body.meta).toHaveProperty('limit');
    expect(users.body).toHaveProperty('data');
    expect(users.body.data).toHaveLength(10);
    expect(users.body.meta).toMatchObject({
      ...users.body.meta,
      // valida se fez a conversão de Number -> String ()
      page: expect.any(String),
      limit: expect.any(String),
    });
  });
});

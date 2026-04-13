import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { makeAuthenticate } from '@/shared/factories';
import { makeCreateAdminUser } from '@/shared/factories/makeCreateAdminUser';

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
    const { cookies } = await makeAuthenticate(app, user.email);

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
      // valida se fez a conversão de Number -> String ()
      page: expect.any(Number),
      limit: expect.any(Number),
    });
  });
});

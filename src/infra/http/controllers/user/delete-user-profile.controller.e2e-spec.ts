import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../../app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { makeAuthenticate, makeUser } from '@/shared/factories';

describe('Delete User Profile (E2E)', () => {
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

  it('[DELETE] /accounts/me', async () => {
    const user = await makeUser(prisma);
    const { cookies } = await makeAuthenticate(app, user.email);

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

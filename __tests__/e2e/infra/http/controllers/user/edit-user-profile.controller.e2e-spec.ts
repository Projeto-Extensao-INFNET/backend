import { faker } from '@faker-js/faker/locale/pt_BR';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { makeAuthenticate, makeUser } from '@/shared/factories';

describe('Edit User Profile (E2E)', () => {
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

  it('[PATCH] /accounts/me', async () => {
    const user = await makeUser(prisma);
    const { cookies } = await makeAuthenticate(app, user.email);
    const uniqueEmail = faker.internet.email(); // email único para cada vez que rodar o teste

    const userExists = await request(app.getHttpServer())
      .get('/accounts/me')
      .set('Cookie', cookies);

    const updateUserProfile = await request(app.getHttpServer())
      .patch('/accounts/me')
      .send({ name: 'Novo Nome', email: uniqueEmail })
      .set('Cookie', cookies); //passa os campos que serão atualizados

    expect(userExists.statusCode).toBe(200);
    expect(updateUserProfile.statusCode).toBe(200);
  });
});




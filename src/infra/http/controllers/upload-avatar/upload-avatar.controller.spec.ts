import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { AppModule } from '@/infra/app.module';
import request from 'supertest';

describe('UploadAvatarController', () => {
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
});

import type { INestApplication } from '@nestjs/common';
import { CreateAppointmentsController } from './create-appointments.controller';
import { Test } from '@nestjs/testing';
import { PrismaService } from '@/infra/database/prisma.service';
import { AppModule } from '@/app.module';

describe('Create Appointments (E2E)', () => {
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

  it('[POST] /appointments/create ', () => {
    expect(true).toBe(true); // TODO criar tests E2E
  });
});

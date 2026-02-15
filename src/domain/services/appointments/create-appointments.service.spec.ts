import { Test, TestingModule } from '@nestjs/testing';
import { CreateAppointmentsService } from './create-appointments.service';
import { MockPrismaService } from '@/test/mocks/prisma';
import { PrismaService } from '@/infra/database/prisma.service';
import {
  IPrismaAppointmentsRepository,
  PrismaAppointmentsRepository,
} from '@/core/repositories/prisma-appointments.repository';

describe('CreateAppointmentsService', () => {
  let service: CreateAppointmentsService;
  const mockPrismaService = MockPrismaService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAppointmentsService,
        {
          provide: IPrismaAppointmentsRepository,
          useValue: PrismaAppointmentsRepository,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CreateAppointmentsService>(CreateAppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CreateAppointmentsService } from '@Services/appointments/create-appointments.service';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import {
  IPrismaAppointmentsRepository,
  PrismaAppointmentsRepository,
} from '@/infra/database/repositories/prisma-appointments.repository';

const mockAppointmentsRepository = {
  createAppointment: vi.fn(),
};

describe.skip('CreateAppointmentsService', () => {
  let service: CreateAppointmentsService;

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
          useValue: mockAppointmentsRepository,
        },
      ],
    }).compile();

    service = module.get<CreateAppointmentsService>(CreateAppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

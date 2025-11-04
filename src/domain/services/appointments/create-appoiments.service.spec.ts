import { Test, TestingModule } from '@nestjs/testing';
import { CreateAppointmentsService } from './create-appointments.service';

describe('CreateAppointmentsService', () => {
  let service: CreateAppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAppointmentsService],
    }).compile();

    service = module.get<CreateAppointmentsService>(CreateAppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

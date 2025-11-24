import { Test, TestingModule } from '@nestjs/testing';
import { CancelAppointmentsService } from './cancel-appointments.service';

describe('CancelAppointmentsService', () => {
  let service: CancelAppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancelAppointmentsService],
    }).compile();

    service = module.get<CancelAppointmentsService>(CancelAppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

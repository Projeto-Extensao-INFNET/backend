import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAppointmentsService } from './update-appointments.service';

describe('UpdateAppointmentsService', () => {
  let service: UpdateAppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateAppointmentsService],
    }).compile();

    service = module.get<UpdateAppointmentsService>(UpdateAppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

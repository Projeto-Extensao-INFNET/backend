import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAppointmentsService } from '@Services/appointments/update-appointments.service';

describe.skip('UpdateAppointmentsService', () => {
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

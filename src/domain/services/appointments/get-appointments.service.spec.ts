import { Test, TestingModule } from '@nestjs/testing';
import { GetAppointmentsService } from './get-appointments.service';

describe('GetAppointmentsService', () => {
  let service: GetAppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAppointmentsService],
    }).compile();

    service = module.get<GetAppointmentsService>(GetAppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GetAppointmentsController } from './get-appointments.controller';

describe('Get Appointments (E2E)', () => {
  let controller: GetAppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAppointmentsController],
    }).compile();

    controller = module.get<GetAppointmentsController>(
      GetAppointmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

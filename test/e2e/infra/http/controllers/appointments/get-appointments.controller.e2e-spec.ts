import { Test, TestingModule } from '@nestjs/testing';
import { GetAppointmentsController } from '@/infra/http/controllers/appointments/get-appointments.controller';

describe.skip('Get Appointments (E2E)', () => {
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

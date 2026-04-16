import { CancelAppointmentsController } from '@/infra/http/controllers/appointments/cancel-appointments.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Cancel Appointments (E2E)', () => {
  let controller: CancelAppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancelAppointmentsController],
    }).compile();

    controller = module.get<CancelAppointmentsController>(
      CancelAppointmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});




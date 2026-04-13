import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAppointmentsController } from '@/infra/http/controllers/appointments/update-appointments.controller';

describe('Update Appointments (E2E)', () => {
  let controller: UpdateAppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateAppointmentsController],
    }).compile();

    controller = module.get<UpdateAppointmentsController>(
      UpdateAppointmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});




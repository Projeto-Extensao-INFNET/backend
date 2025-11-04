import { CreateAppointmentsController } from './create-appointments.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Create Appointments (E2E)', () => {
  let controller: CreateAppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateAppointmentsController],
    }).compile();

    controller = module.get<CreateAppointmentsController>(
      CreateAppointmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

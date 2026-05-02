import { Test, TestingModule } from '@nestjs/testing';

import { AppointmentsController } from '@Controllers/appointments/appointments.controller';

describe('Appointments Controller (E2E)', () => {
  let controller: AppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(`${AppointmentsController.prototype.cancelAppointments.name}`, () => {
    it.todo('[PATCH] /appointments/create ', () => {});
  });

  describe(`${AppointmentsController.prototype.createAppointments.name}`, () => {
    it.todo('[POST] /appointments/create ', () => {});
  });

  describe(`${AppointmentsController.prototype.getAppointments.name}`, () => {
    it.todo('[GET] /appointments/create ', () => {});
  });

  describe(`${AppointmentsController.prototype.updateAppointments.name}`, () => {
    it.todo('[PUT] /appointments/create ', () => {});
  });
});

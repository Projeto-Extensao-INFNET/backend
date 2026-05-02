import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from '@Services/appointments/appointments.service';

describe.skip('Appointments Service', () => {
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsService],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`${AppointmentsService.prototype.cancelAppointments.name}`, () => {
    it.todo('', () => {});
  });

  describe(`${AppointmentsService.prototype.createAppointment.name}`, () => {
    it.todo('', () => {});
  });

  describe(`${AppointmentsService.prototype.getAppointments.name}`, () => {
    it.todo('', () => {});
  });

  describe(`${AppointmentsService.prototype.updateAppointments.name}`, () => {
    it.todo('', () => {});
  });
});

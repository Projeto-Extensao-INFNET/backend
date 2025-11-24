import { Controller, Get } from '@nestjs/common';

@Controller('/appointments')
export class GetAppointmentsController {
  @Get()
  async getAppointments() {}
}

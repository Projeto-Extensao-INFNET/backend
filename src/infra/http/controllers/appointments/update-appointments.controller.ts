import { Controller, Put } from '@nestjs/common';

@Controller('/appointments')
export class UpdateAppointmentsController {
  @Put()
  async updateAppointments() {}
}

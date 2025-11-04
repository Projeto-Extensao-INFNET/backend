import { Controller, Post } from '@nestjs/common';

// preciso criar um agendamento unindo os profissionais disponíveis (tabela schedules) com a agenda dos pacientes (tabela user_agenda)
@Controller('/appointments')
export class CreateAppointmentsController {
  @Post()
  async createAppointments() {}
}

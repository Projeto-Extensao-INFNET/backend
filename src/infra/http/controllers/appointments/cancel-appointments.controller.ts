import { Controller } from '@nestjs/common';

@Controller('/appointments')
export class CancelAppointmentsController {
  // ?? cancelar um agendamento seria deletar (DELETE) ou editar o status (PUT)?
  async cancelAppointments() {}
}

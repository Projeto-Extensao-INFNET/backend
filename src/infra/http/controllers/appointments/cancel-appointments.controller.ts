import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Appointments')
@Controller('/appointments')
export class CancelAppointmentsController {
  // ?? cancelar um agendamento seria deletar (DELETE) ou editar o status (PUT)?
  async cancelAppointments() {}
}

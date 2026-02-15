import { Roles } from '@/shared/decorators/roles.decorator';
import type { CreateAppointmentDto } from '@/shared/dto/appointments/create-appointment.dto';
import type { ROLE } from '@/shared/types';
import { CreateAppointmentsService } from '@/domain/services/appointments/create-appointments.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('/appointments')
export class CreateAppointmentsController {
  constructor(
    private readonly createAppointmentService: CreateAppointmentsService,
  ) {}

  @Post('create')
  @Roles('PATIENT' as ROLE)
  @HttpCode(HttpStatus.CREATED)
  async createAppointments(@Body() body: CreateAppointmentDto) {
    return this.createAppointmentService.exec(body);
  }
}

import { Roles } from '@/core/shared/decorators/roles.decorator';
import type { CreateAppointmentDto } from '@/core/shared/dto/appointments/create-appointment.dto';
import { ROLE } from '@/core/shared/types';
import { CreateAppointmentsService } from '@/domain/services/appointments/create-appointments.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('/appointments')
export class CreateAppointmentsController {
  constructor(
    private readonly createAppointmentService: CreateAppointmentsService,
  ) {}

  @Post('create')
  @Roles(ROLE.PATIENT)
  @HttpCode(201)
  async createAppointments(@Body() body: CreateAppointmentDto) {
    return this.createAppointmentService.createAppointments(body);
  }
}

import type { CreateAppointmentDto } from '@/core/shared/dto/appointments/create-appointment.dto';
import { CreateAppointmentsService } from '@/domain/services/appointments/create-appointments.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('/appointments')
export class CreateAppointmentsController {
  constructor(
    private readonly createAppointmentService: CreateAppointmentsService,
  ) {}

  @Post('create')
  @HttpCode(201)
  async createAppointments(@Body() body: CreateAppointmentDto) {
    return this.createAppointmentService.createAppointments(body);
  }
}

import { Roles } from '@/infra/auth/decorators/roles.decorator';
import { CreateAppointmentsService } from '@Services/appointments/create-appointments.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateAppointmentDto } from '@/infra/http/dtos/appointments/create-appointment.dto';

import type { ROLE } from '@/shared/types';

@Controller('/appointments')
@ApiTags('Appointments')
@ApiBearerAuth('authorization')
export class CreateAppointmentsController {
  constructor(
    private readonly createAppointmentService: CreateAppointmentsService,
  ) {}

  @Post('create')
  @Roles('PATIENT' as ROLE)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create an appointment (patient only)',
    operationId: 'createAppointment',
  })
  @ApiBody({
    description: 'Appointment data to create',
    type: CreateAppointmentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Appointment created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid appointment data',
  })
  @ApiResponse({ status: 404, description: 'Recurso não encontrado!' })
  @ApiResponse({ status: 404, description: 'Recurso não encontrado!' })
  @ApiResponse({ status: 409, description: 'Agendamento indisponível!' })
  @ApiResponse({ status: 409, description: 'Agendamento indisponível!' })
  async createAppointments(@Body() body: CreateAppointmentDto) {
    return this.createAppointmentService.exec(body);
  }
}

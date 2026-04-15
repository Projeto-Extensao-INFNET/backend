import { Roles } from '@/infra/auth/decorators/roles.decorator';
import type { ROLE } from '@/shared/types';
import { CreateAppointmentsService } from '@Services/appointments/create-appointments.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import {
  ERROR_USER_NOT_FOUND,
  ERROR_SCHEDULE_NOT_FOUND,
  ERROR_SCHEDULE_NOT_AVAILABLE,
  ERROR_SCHEDULE_ALREADY_BOOKED,
} from '@/shared/errors';
import { CreateAppointmentDto } from '@/infra/http/dtos/appointments/create-appointment.dto';

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
  @ApiResponse({ status: 404, description: ERROR_USER_NOT_FOUND })
  @ApiResponse({ status: 404, description: ERROR_SCHEDULE_NOT_FOUND })
  @ApiResponse({ status: 409, description: ERROR_SCHEDULE_NOT_AVAILABLE })
  @ApiResponse({ status: 409, description: ERROR_SCHEDULE_ALREADY_BOOKED })
  async createAppointments(@Body() body: CreateAppointmentDto) {
    return this.createAppointmentService.exec(body);
  }
}

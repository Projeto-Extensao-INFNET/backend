import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '@/infra/auth/decorators/roles.decorator';

import { AppointmentsService } from '@Services/appointments/appointments.service';

import { CreateAppointmentDto } from '../../dtos/appointments/create-appointment.dto';

import type { ROLE } from '@/shared/types';

@Controller('/appointments')
@ApiTags('Appointments')
@ApiBearerAuth('authorization')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

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
    return this.service.createAppointment(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get appointments', operationId: 'getAppointment' })
  @ApiResponse({
    status: 200,
    description: 'List of appointments',
  })
  async getAppointments() {}

  @Put()
  @ApiOperation({
    summary: 'Update appointment',
    operationId: 'updateAppointment',
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment updated successfully',
  })
  async updateAppointments() {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT) // ou OK?
  @ApiOperation({
    summary: 'Cancel appointment',
    operationId: 'cancelAppointment',
  })
  @ApiResponse({
    status: 204,
    description: 'Appointment cancelled successfully',
  })
  async cancelAppointments() {}
}

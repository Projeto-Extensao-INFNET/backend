import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Appointments')
@Controller('/appointments')
export class GetAppointmentsController {
  @Get()
  @ApiOperation({ summary: 'Get appointments', operationId: 'getAppointment' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getAppointments() {}
}

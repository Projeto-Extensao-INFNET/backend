import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Appointments')
@Controller('/appointments')
export class GetAppointmentsController {
  @Get()
  @ApiOperation({ summary: 'Get appointments', operationId: 'getAppointment' })
  @ApiResponse({
    status: 200,
    description: 'List of appointments',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          scheduleId: { type: 'string' },
          userId: { type: 'string' },
          specialtyId: { type: 'string' },
          typeOfTreatmentId: { type: 'string' },
          isAvailable: { type: 'boolean' },
          isConfirmed: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  async getAppointments() {}
}

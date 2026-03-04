import { Controller, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Appointments')
@Controller('/appointments')
export class UpdateAppointmentsController {
  @Put()
  @ApiOperation({
    summary: 'Update appointment',
    operationId: 'updateAppointment',
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment updated successfully',
    schema: {
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
  })
  async updateAppointments() {}
}

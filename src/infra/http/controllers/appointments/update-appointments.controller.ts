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
  @ApiResponse({ status: 200, description: 'Updated' })
  async updateAppointments() {}
}

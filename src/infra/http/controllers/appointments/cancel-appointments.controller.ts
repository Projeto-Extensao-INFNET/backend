import { Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Appointments')
@Controller('/appointments')
export class CancelAppointmentsController {
  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
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

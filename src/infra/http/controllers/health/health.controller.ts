import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { successResponse } from '@/shared/errors/responses/success.response';
import { env } from '@/config/env';

@Controller()
@ApiTags('Health')
export class HealthController {
  @Get('/health')
  @ApiOperation({ summary: 'Health check', operationId: 'healthCheck' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async getHealth() {
    return successResponse(
      `App running on http://localhost/${env.PORT}/api`,
      HttpStatus.OK,
    );
  }
}

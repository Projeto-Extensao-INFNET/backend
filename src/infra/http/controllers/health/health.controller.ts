import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
@ApiTags('Health')
export class HealthController {
  @Get('/health')
  @ApiOperation({ summary: 'Health check', operationId: 'healthCheck' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}

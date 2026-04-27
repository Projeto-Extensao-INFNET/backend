import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Specialty')
@Controller('specialty')
export class SpecialtyController {}

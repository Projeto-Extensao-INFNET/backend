import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Treatment Type')
@Controller('treatment-type')
export class TreatmentTypeController {}

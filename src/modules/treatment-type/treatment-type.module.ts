import { Module } from '@nestjs/common';
import { TreatmentTypeService } from './services/treatment-type.service';

@Module({
	providers: [TreatmentTypeService],
})
export class TreatmentTypeModule {}

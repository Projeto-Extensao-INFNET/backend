import { Module } from '@nestjs/common';
import { TreatmentTypeService } from '@/application/services/treatment-type.service';

@Module({
	providers: [TreatmentTypeService],
	exports: [TreatmentTypeService],
})
export class TreatmentTypeModule {}

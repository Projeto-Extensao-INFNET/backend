import { Module } from '@nestjs/common';
import { SpecialtyService } from '@/application/services/specialty.service';

@Module({
	providers: [SpecialtyService],
	exports: [SpecialtyService],
})
export class SpecialtyModule {}

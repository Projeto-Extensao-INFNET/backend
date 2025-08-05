import { Module } from '@nestjs/common';
import { SpecialtyController } from './controllers/specialty.controller';

@Module({
	controllers: [SpecialtyController],
})
export class SpecialtyModule {}

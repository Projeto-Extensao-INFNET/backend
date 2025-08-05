import { Module } from '@nestjs/common';
import { ProfessionalsController } from './controllers/professionals.controller';
import { ProfessionalsService } from './services/professionals.service';

@Module({
	providers: [ProfessionalsService],
	controllers: [ProfessionalsController],
})
export class ProfessionalsModule {}

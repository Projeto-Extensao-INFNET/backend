import { Controller, Get, HttpCode } from '@nestjs/common';
import { ProfessionalsService } from '@services/professionals.service';
import { ROLE } from '@/_types';
import { Roles } from '@/shared/decorators/roles.decorator';

@Controller('/accounts')
export class GetProfessionalsController {
	constructor(private readonly professionalService: ProfessionalsService) {}

	@Roles(ROLE.PATIENT)
	@Get('professionals')
	@HttpCode(200)
	async listProfessionals() {
		return await this.professionalService.listProfessionals();
	}
}

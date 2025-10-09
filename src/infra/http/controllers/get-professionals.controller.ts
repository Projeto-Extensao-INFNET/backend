import { Controller, Get, HttpCode } from '@nestjs/common';
import { ROLE } from '@/_types';
import { ProfessionalsService } from '@/application/services/professionals.service';
import { Roles } from '@/modules/auth/decorators/roles.decorator';

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

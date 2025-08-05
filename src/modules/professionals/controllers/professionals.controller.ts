/* 
TODO: JWT - Proteger rotas do profissional:

1. ROTAS PÚBLICAS (sem autenticação):
- [x] @Get() -> listar profissionais disponíveis
- [x] @Get(':id') -> ver detalhes de um profissional específico

2. USAR O GUARD NAS ROTAS PROTEGIDAS:
- [ ] import { UseGuards, Request } from '@nestjs/common';
- [ ] import { JwtGuard } from '@/guards/jwt.guard';
- [ ] @UseGuards(JwtGuard) nas rotas protegidas

3. NOVAS ROTAS PROTEGIDAS (requerem JWT):
- [ ] @Get('me') -> ver próprio perfil profissional
- [ ] @Put('me') -> editar próprio perfil profissional
- [ ] @Delete('me') -> excluir própria conta
- [ ] @Post('schedules') -> criar horários disponíveis
- [ ] @Get('schedules/me') -> ver própria agenda
- [ ] @Put('schedules/:id') -> editar horário
- [ ] @Delete('schedules/:id') -> remover horário
- [ ] @Get('appointments/me') -> ver agendamentos com pacientes
- [ ] @Post('profile/avatar') -> upload foto de perfil
- [ ] @Get('patients/me') -> ver pacientes agendados

4. APLICAR ROLE-BASED ACCESS:
- [ ] Verificar se user.role === 'PROFESSIONAL' nas rotas protegidas
*/
import {
	Controller,
	Get,
	HttpCode,
	NotFoundException,
	Param,
} from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';

// interface AuthenticatedRequest {}

@Controller('professionals')
export class ProfessionalsController {
	constructor(private readonly prisma: PrismaService) {}

	@Get()
	@HttpCode(200)
	async listProfessionals() {
		const professionals = await this.prisma.professional.findMany({
			select: {
				typeOfQuery: true,
				price: true,
				paymentMethod: true,
				document: true,
				gender: true,
				avatar: true,
				phone: true,
				user: {
					select: {
						name: true,
						email: true,
					},
				},
				specialty: {
					select: {
						name: true,
					},
				},
				typeOfTreatment: {
					select: {
						name: true,
					},
				},
			},
		});

		return professionals;
	}
	@Get(':id')
	@HttpCode(200)
	async listProfessionalsById(@Param('id') id: string) {
		const professional = await this.prisma.professional.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				typeOfQuery: true,
				price: true,
				paymentMethod: true,
				document: true,
				gender: true,
				avatar: true,
				phone: true,
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				specialty: {
					select: {
						id: true,
						name: true,
					},
				},
				typeOfTreatment: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		if (!professional) {
			throw new NotFoundException('Profissional não encontrado');
		}

		return professional;
	}

	// @Get('me')
	// @HttpCode(200)
	// async getProfessionalProfile(@Request() req: AuthenticatedRequest) {}
}

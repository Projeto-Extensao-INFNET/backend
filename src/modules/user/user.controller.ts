import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
} from '@nestjs/common';
import type { createUserBodySchema } from '@/schemas/CreateUserBodySchema';
import { hashPassword } from '@/utils';
import { PrismaService } from '../prisma/prisma.service';

/* 
TODO: JWT SIMPLES - Proteger rotas do usuário:

1. CRIAR GUARD SIMPLES PRIMEIRO:
   - [ ] Criar pasta: src/guards/
   - [ ] Criar arquivo: jwt.guard.ts
   - [ ] Guard básico que verifica token

2. USAR O GUARD NAS ROTAS:
   - [ ] import { UseGuards } from '@nestjs/common';
   - [ ] import { JwtGuard } from '@/guards/jwt.guard';
   - [ ] @UseGuards(JwtGuard) nas rotas protegidas

3. MUDAR ROTAS PARA /me:
   - [ ] @Get('me') em vez de @Get(':id')
   - [ ] @Delete('me') em vez de @Delete(':id')
   - [ ] Pegar user da request: req.user.id

RESUMO: Guard simples → Proteger rotas → Usar /me
*/

@Controller('/accounts')
export class UserController {
	constructor(private readonly prisma: PrismaService) {}

	@Post()
	@HttpCode(201)
	async create(@Body() body: createUserBodySchema) {
		const {
			name,
			email,
			password,
			role,
			birthDate,
			document,
			documentType,
		} = body;

		const userWithSameEmail = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userWithSameEmail) {
			throw new ConflictException('Usuário com o mesmo email já existe');
		}

		const userWithSameDocument = await this.prisma.user.findUnique({
			where: {
				document,
			},
		});

		if (userWithSameDocument) {
			throw new ConflictException(
				'Usuário com o mesmo documento já existe',
			);
		}

		const hashedPassword = await hashPassword(password);

		const user = await this.prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				birthDate: new Date(birthDate),
				role,
				documentType,
				document,
			},
		});

		return user;
	}

	@Get(':id')
	@HttpCode(200)
	async getUserById(@Param('id') id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			throw new NotFoundException('Usuário não encontrado');
		}

		return user;
	}
	@Get()
	@HttpCode(200)
	async getUsers() {
		const users = await this.prisma.user.findMany({
			select: {
				name: true,
				email: true,
				birthDate: true,
				role: true,
			},
		});

		return users;
	}

	@Delete(':id')
	@HttpCode(204)
	async delete(@Param('id') id: string) {
		await this.prisma.user.delete({
			where: {
				id,
			},
		});
	}
}

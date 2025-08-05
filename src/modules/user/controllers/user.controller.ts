import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Post,
	Request,
} from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import type { CreateUserRequest } from '@/modules/user/dto/create-user.dto';
import { hashPassword } from '@/utils';

/* 
TODO: JWT SIMPLES - Proteger rotas do usuário:

1. CRIAR GUARD SIMPLES PRIMEIRO:
   - [x] Criar pasta: src/auth/guards/
   - [x] Criar arquivo: jwt.guard.ts
   - [ ] Guard básico que verifica token

2. USAR O GUARD NAS ROTAS:
   - [ ] import { UseGuards } from '@nestjs/common';
   - [ ] import { JwtGuard } from '@/guards/jwt.guard';
   - [ ] @UseGuards(JwtGuard) nas rotas protegidas

3. MUDAR ROTAS PARA /me:
   - [x] @Get('me') em vez de @Get(':id')
   - [x] @Delete('me') em vez de @Delete(':id')
   - [x] Pegar user da request: req.user.id

4. Novas Rotas: 
  - [] @Put('me') editar perfil (?)
  - [] @Post('appointments') -> agendar consulta
  - [] @Get('appointments/me') -> listar consultas do usuário
  - [] @Put('appointments/:id') -> alterar consultas do usuário
  - [] @Delete('appointments/:id') -> cancelar consultas do usuário
  - [] @Get('professionals/:id') -> ver detalhes de um profissional (perfil do profissional?)

*/

interface AuthenticatedRequest extends Request {
	user: {
		id: string;
		email: string;
	};
}

@Controller('/accounts')
export class UserController {
	constructor(private readonly prisma: PrismaService) {}

	@Post()
	@HttpCode(201)
	async create(@Body() body: CreateUserRequest) {
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

	@Get('me')
	@HttpCode(200)
	async getUserById(@Request() req: AuthenticatedRequest) {
		const userId = req.user.id;

		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
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

	@Delete('me')
	@HttpCode(204)
	async delete(@Request() req: AuthenticatedRequest) {
		const userId = req.user.id;

		await this.prisma.user.delete({
			where: {
				id: userId,
			},
		});
	}
}

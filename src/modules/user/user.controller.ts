import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
} from '@nestjs/common';
import type { createUserBodySchema } from '@/schemas/CreateUserBodySchema';
import { hashPassword } from '@/utils';
import { PrismaService } from '../prisma/prisma.service';

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
			throw new Error('Usuário com o mesmo email já existe'); // ?? criar uma Exception customizada?
		}

		const userWithSameDocument = await this.prisma.user.findUnique({
			where: {
				document,
			},
		});

		if (userWithSameDocument) {
			throw new Error('Usuário com o mesmo documento já existe'); // ?? criar uma Exception customizada?
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
			return null; // ?? adicionar uma Exception customizada?
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
				password: true,
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

import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type { createUserBodySchema } from '@/schemas/CreateUserBodySchema';
import { hashPassword } from '@/utils';
import { PrismaService } from '../prisma/prisma.service';

@Controller('/accounts')
export class UserController {
	constructor(private readonly prisma: PrismaService) {}

	@Post()
	@HttpCode(201)
	async execute(@Body() body: createUserBodySchema) {
		const { name, email, password } = body;

		const userWithSameEmail = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userWithSameEmail) {
			throw new Error('Usuário com o mesmo email já existe'); // TODO criar uma Exception customizada
		}

		const hashedPassword = await hashPassword(password);

		await this.prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: 'PATIENT',
				documentType: 'CPF',
				document: '000.000.000-00',
			},
		});
	}
}

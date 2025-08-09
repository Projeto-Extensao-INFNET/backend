import {
	BadRequestException,
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { comparePassword, hashPassword } from '@/utils';
import type { SignUpDto } from '../dto/signUp.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}
	// Cadastro
	async SignUp(data: SignUpDto) {
		if (!data || !data.email || !data.password || !data.name) {
			throw new BadRequestException('Campos obrigatórios não fornecidos');
		}

		const existingUser = await this.prismaService.user.findUnique({
			where: {
				email: data.email,
			},
		});

		if (existingUser) {
			throw new ConflictException('Credenciais já estão em uso');
		}

		const hashedPassword = await hashPassword(data.password);

		const user = await this.prismaService.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
				birthDate: data.birthDate,
				role: data.role,
				documentType: data.documentType,
				document: data.document,
			},
		});

		const { password: _, ...userWithoutPassword } = user;

		return userWithoutPassword;
	}

	// Login
	async SignIn(email: string, password: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new UnauthorizedException('Credenciais inválidas');
		}

		const isPasswordHashed = await comparePassword(password, user.password);

		if (!isPasswordHashed) {
			throw new UnauthorizedException('Credenciais inválidas');
		}

		const payload = { username: user.email, sub: user.id };
		return { accessToken: this.jwtService.sign(payload) };
	}
}

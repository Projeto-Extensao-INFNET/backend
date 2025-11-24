import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { SignUpDto } from '@/core/shared/dto/auth/signUp.dto';
import { comparePassword, hashPassword } from '@/core/shared/utils';
import { PrismaService } from '@/infra/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  // Cadastro
  async SignUp(data: SignUpDto) {
    if (!data || !data.email || !data.password || !data.name) {
      throw new BadRequestException('Required fields not provided');
    }

    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Credentials already in use');
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
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordHashed = await comparePassword(password, user.password);

    if (!isPasswordHashed) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}

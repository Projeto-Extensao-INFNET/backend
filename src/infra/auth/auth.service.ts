import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from '@/utils';
import { PrismaService } from '@/infra/database/prisma.service';
import type { SignUpDto } from '@/shared/dto/auth/signUp.dto';
import type { SignInDto } from '@/shared/dto/auth/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  // Cadastro
  async SignUp(data: SignUpDto) {
    // valida campos obrigatórios
    if (!data || !data.name || !data.email || !data.password) {
      throw new BadRequestException('Required fields not provided');
    }

    // Verifica se email já existe
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Credentials already in use');
    }

    // Verifica se documento já existe
    const existingDocument = await this.prismaService.user.findUnique({
      where: {
        document: data.document,
      },
    });

    if (existingDocument) {
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
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        birthDate: true,
        role: true,
        documentType: true,
        document: true,
      },
    });

    return user;
  }

  // Login
  async SignIn(data: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordHashed = await comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordHashed) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}

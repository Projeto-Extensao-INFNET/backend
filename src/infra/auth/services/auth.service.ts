import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { comparePassword, hashPassword } from '@/utils';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import type {
  SignUpDto,
  SignUpResponseDto,
} from '@/shared/dto/auth/signUp.dto';
import type {
  SignInDto,
  SignInResponseDto,
} from '@/shared/dto/auth/signIn.dto';
import {
  ERROR_CREDENTIALS_IN_USE,
  ERROR_INVALID_CREDENTIALS,
  ERROR_REQUIRED_FIELDS,
} from '@/shared/errors';
import { GetTokens } from '../jwt/generate-jwt-tokens';
import { hash } from 'bcryptjs';
import { SALT_ROUNDS } from '@/shared/constants';
import { email } from 'zod';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly getTokens: GetTokens,
  ) {}

  // Cadastro
  async SignUp(data: SignUpDto): Promise<SignUpResponseDto> {
    // valida campos obrigatórios
    if (!data || !data.name || !data.email || !data.password) {
      throw new BadRequestException(ERROR_REQUIRED_FIELDS);
    }

    const existingEmail = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingEmail) {
      throw new ConflictException(ERROR_CREDENTIALS_IN_USE);
    }

    // Verifica se documento já existe
    const existingDocument = await this.prismaService.user.findUnique({
      where: {
        document: data.document,
      },
    });

    if (existingDocument) {
      throw new ConflictException(ERROR_CREDENTIALS_IN_USE);
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
  async SignIn(data: SignInDto): Promise<SignInResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!user) throw new UnauthorizedException(ERROR_INVALID_CREDENTIALS);

    const isPasswordHashed = await comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordHashed)
      throw new UnauthorizedException(ERROR_INVALID_CREDENTIALS);

    // dados que vão para o JWT
    const payload = {
      username: user.email,
      sub: user.id,
      role: user.role,
    };

    // gera os tokens JWT com os dados do payload
    const tokens = await this.getTokens.exec(payload);

    // faz o hash do refreshToken
    const hashedRefreshToken = await hash(tokens.refreshToken, SALT_ROUNDS);

    // atualiza o refreshToken no banco de dados
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,

      data: { user: payload },
    };
  }
}

import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword, hashRefreshToken } from '@/utils';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import type {
  SignUpDto,
  SignUpResponseDto,
} from '@/shared/dto/auth/signUp.dto';
import type { SignInDto } from '@/shared/dto/auth/signIn.dto';
import {
  ERROR_CREDENTIALS_IN_USE,
  ERROR_INVALID_CREDENTIALS,
  ERROR_REQUIRED_FIELDS,
} from '@/shared/errors';
import type { TokenResponse } from '@/shared/dto/auth/token-response';
import {
  JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_TOKEN_EXPIRATION,
} from '@/shared/constants';
import { createHash } from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
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
  async SignIn(data: SignInDto): Promise<TokenResponse> {
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
      throw new UnauthorizedException(ERROR_INVALID_CREDENTIALS);
    }

    const isPasswordHashed = await comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordHashed) {
      throw new UnauthorizedException(ERROR_INVALID_CREDENTIALS);
    }

    // dados que vão para o jwt
    const payload = {
      username: user.email,
      sub: user.id,
      role: user.role,
    };

    // cria o access token
    const accessToken = this.jwtService.sign(
      {
        ...payload,
        type: 'access',
      },
      { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION },
    );

    // cria o refresh token
    const refreshToken = this.jwtService.sign(
      {
        ...payload,
        type: 'refresh',
      },
      { expiresIn: JWT_REFRESH_TOKEN_EXPIRATION },
    );

    // atualiza o refresh token do usuário no banco de dados
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: hashRefreshToken(refreshToken),
      },
    });

    return { accessToken, refreshToken };
  }
}

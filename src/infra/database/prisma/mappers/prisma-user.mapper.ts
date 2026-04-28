import type { Prisma } from '../generated/client';
import type { CreateUserInput } from '@/shared/types';

export class PrismaAuthUserMapper {
  static toPrisma = (user: CreateUserInput): Prisma.UserCreateInput => ({
    name: user.name,
    email: user.email,
    password: user.password,
    birthDate: user.birthDate,
    role: user.role,
    documentType: user.documentType,
    document: user.document,
  });
}

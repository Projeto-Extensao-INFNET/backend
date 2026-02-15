import { Test, TestingModule } from '@nestjs/testing';
import { AvatarUploadService } from './avatar-upload.service';
import {
  IUserRepository,
  PrismaUserRepository,
} from '@/core/repositories/prisma-user-repository';
import { PrismaService } from '@/infra/database/prisma.service';

// TODO -> verificar se vale a pena usar os mocks assim ou com o '@/test/mocks/prisma' e exportar para reutilizar
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    user: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
  })),
}));

describe('AvatarUploadService', () => {
  let service: AvatarUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvatarUploadService,
        PrismaService,
        {
          provide: IUserRepository,
          useClass: PrismaUserRepository,
        },
      ],
    }).compile();

    service = module.get<AvatarUploadService>(AvatarUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

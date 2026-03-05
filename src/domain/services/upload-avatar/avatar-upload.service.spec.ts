import { Test, TestingModule } from '@nestjs/testing';
import { AvatarUploadService } from './avatar-upload.service';
import {
  IUserRepository,
  PrismaUserRepository,
} from '@/infra/database/repositories/prisma-user-repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

const mockPrisma = {
  user: {
    create: vi.fn(),
    findUnique: vi.fn(),
  },
};

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => mockPrisma),
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

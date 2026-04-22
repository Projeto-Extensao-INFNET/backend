import { Test, TestingModule } from '@nestjs/testing';

import { AvatarUploadService } from '@Services/upload-avatar/avatar-upload.service';

import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';

const mockRepository = {
  user: {
    create: vi.fn(),
    findUnique: vi.fn(),
  },
};

describe.skip('AvatarUploadService', () => {
  let service: AvatarUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvatarUploadService,
        { provide: IUserRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<AvatarUploadService>(AvatarUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

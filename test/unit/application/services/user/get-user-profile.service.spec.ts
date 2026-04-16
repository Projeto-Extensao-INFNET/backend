import { NotFoundException } from '@nestjs/common';
import { ERROR_USER_NOT_FOUND } from '@/shared/errors';
import { Test, TestingModule } from '@nestjs/testing';
import { GetUserProfileService } from '@Services/user/get-user-profile.service';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { createFakeUser } from 'test/shared/factories';

const mockUserRepository = {
  getProfile: vi.fn(),
};

describe('GetUserProfileService', () => {
  let service: GetUserProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserProfileService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<GetUserProfileService>(GetUserProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserProfileService', () => {
    it('should get user profile', async () => {
      const user = createFakeUser();

      mockUserRepository.getProfile.mockResolvedValue(user);

      const result = await service.execute(user.id);

      expect(result.id).toBe(user.id);
    });

    it('it should throw NotFoundException when user not found', async () => {
      mockUserRepository.getProfile.mockResolvedValue(null);

      await expect(service.execute('id-que-nao-existe')).rejects.toThrow(
        new NotFoundException(ERROR_USER_NOT_FOUND),
      );
    });
  });
});

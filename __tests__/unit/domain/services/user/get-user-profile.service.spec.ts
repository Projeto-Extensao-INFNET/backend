import { NotFoundException } from '@nestjs/common';
import { ERROR_USER_NOT_FOUND } from '@/shared/errors';
import { Test, TestingModule } from '@nestjs/testing';
import { nonExistentUserId } from '@/utils';
import { GetUserProfileService } from '@/domain/services/user/get-user-profile.service';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { CreateMockUserWithoutPassword } from '__mocks__/create-mock-user/create-mock-user';

const mockUserRepository = {
  getProfile: vi.fn(),
};

describe('GetUserProfileService', () => {
  let service: GetUserProfileService;
  const userMock = CreateMockUserWithoutPassword;

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
      const user = userMock;

      mockUserRepository.getProfile.mockResolvedValue(userMock);

      const result = await service.execute(user.id);

      expect(result.id).toBe(user.id);
    });

    it('it should throw NotFoundException when user not found', async () => {
      mockUserRepository.getProfile.mockResolvedValue(null);

      await expect(service.execute(nonExistentUserId)).rejects.toThrow(
        new NotFoundException(ERROR_USER_NOT_FOUND),
      );
    });
  });
});

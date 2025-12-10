import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { nonExistentUserId } from '@/core/shared/utils';
import { GetUserProfileService } from '@/domain/services/user/get-user-profile.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { PrismaUserRepository } from '@/domain/repositories/prisma-user-repository';
import { IUserRepository } from '@/core/repositories/user.repository';
import { MockPrismaService } from '@/test/mocks/prisma';
import { CreateMockUser } from '@/test/mocks/create-mock-user/create-mock-user';

describe('GetUserProfileService', () => {
  let service: GetUserProfileService;
  const mockPrismaService = MockPrismaService();

  const userMock = CreateMockUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserProfileService,
        {
          provide: IUserRepository,
          useClass: PrismaUserRepository,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
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

      mockPrismaService.user.findUnique.mockResolvedValue(userMock);

      const result = await service.getUserProfile(user.id);

      expect(result).not.toHaveProperty('password');
      expect(result.id).toBe(user.id);
    });

    it('it should throw NotFoundException when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.getUserProfile(nonExistentUserId)).rejects.toThrow(
        new NotFoundException('User not found'),
      );
    });
  });
});

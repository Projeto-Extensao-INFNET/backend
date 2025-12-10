import { MockPrismaService } from '@/test/mocks/prisma';
import { DeleteUserProfileService } from './delete-user-profile.service';
import { nonExistentUserId } from '@/core/shared/utils';
import { NotFoundException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { UserRepository } from '@/core/repositories/user.repository';
import { PrismaUserRepository } from '@/domain/repositories/prisma-user-repository';
import { PrismaService } from '@/infra/database/prisma.service';
import { CreateMockUser } from '@/test/mocks/create-mock-user/create-mock-user';

describe('deleteAccount ', () => {
  let service: DeleteUserProfileService;
  const mockPrismaService = MockPrismaService();

  const userMock = CreateMockUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserProfileService,
        {
          provide: UserRepository,
          useClass: PrismaUserRepository,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DeleteUserProfileService>(DeleteUserProfileService);
  });

  it('should delete user profile', async () => {
    const user = userMock;

    mockPrismaService.user.delete.mockResolvedValue(user);

    mockPrismaService.user.findUnique
      .mockResolvedValueOnce(user) // 1ª chamada: retorna o usuário
      .mockResolvedValueOnce(null); // 2ª chamada: retorna null

    await service.deleteUserProfile(user.id);

    const result = await mockPrismaService.user.findUnique({
      where: {
        id: user.id,
      },
    });

    expect(result).toBeNull();
  });

  it('it should throw NotFoundException when user not found', async () => {
    mockPrismaService.user.delete.mockRejectedValue(
      new NotFoundException('User not found'),
    );

    await expect(service.deleteUserProfile(nonExistentUserId)).rejects.toThrow(
      new NotFoundException('User not found'),
    );
  });
});

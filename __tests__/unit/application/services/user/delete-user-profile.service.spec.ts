import { DeleteUserProfileService } from '@Services/user/delete-user-profile.service';
import { nonExistentUserId } from '@/utils';
import { NotFoundException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { CreateMockUser } from '__mocks__/create-mock-user/create-mock-user';
import { ERROR_USER_NOT_FOUND } from '@/shared/errors';

const mockUserRepository = {
  findById: vi.fn(),
  deleteProfile: vi.fn(),
};

describe('deleteAccount ', () => {
  let service: DeleteUserProfileService;

  const userMock = CreateMockUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserProfileService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteUserProfileService>(DeleteUserProfileService);
  });

  it('should delete user profile', async () => {
    const user = userMock;

    mockUserRepository.deleteProfile.mockResolvedValue(user);

    mockUserRepository.findById
      .mockResolvedValueOnce(user) // 1ª chamada: retorna o usuário
      .mockResolvedValueOnce(null); // 2ª chamada: retorna null

    await service.execute(user.id);

    const result = await mockUserRepository.findById({
      where: {
        id: user.id,
      },
    });

    expect(result).toBeNull();
  });

  it('it should throw NotFoundException when user not found', async () => {
    mockUserRepository.deleteProfile.mockRejectedValue(
      new NotFoundException(ERROR_USER_NOT_FOUND),
    );

    await expect(service.execute(nonExistentUserId)).rejects.toThrow(
      new NotFoundException(ERROR_USER_NOT_FOUND),
    );
  });
});

import { DeleteUserProfileService } from '@Services/user/delete-user-profile.service';
import { NotFoundException } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { ERROR_USER_NOT_FOUND } from '@/shared/errors';
import { createFakeUser } from '__tests__/shared/factories';

const mockUserRepository = {
  findById: vi.fn(),
  deleteProfile: vi.fn(),
};

describe('deleteAccount ', () => {
  let service: DeleteUserProfileService;

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
    const user = createFakeUser();

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

    await expect(service.execute('id-que-nao-existe')).rejects.toThrow(
      new NotFoundException(ERROR_USER_NOT_FOUND),
    );
  });
});

import { Test, type TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { DeleteUserProfileService } from '@Services/user/delete-user-profile.service';

import { createFakeUser } from 'test/__shared__/factories';

describe('deleteAccount', () => {
  let service: DeleteUserProfileService;

  const mockRepository = {
    findById: vi.fn(),
    deleteProfile: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserProfileService,
        { provide: IUserRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<DeleteUserProfileService>(DeleteUserProfileService);
  });

  describe('Service', () => {
    it('service should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  it('should delete user profile', async () => {
    const user = createFakeUser();

    mockRepository.findById.mockResolvedValue(user);
    mockRepository.deleteProfile.mockResolvedValue({
      message: 'Usuário removido com sucesso!',
    });

    await service.execute(user.id);

    expect(mockRepository.findById).toHaveBeenCalledWith(user.id);
    expect(mockRepository.deleteProfile).toHaveBeenCalledWith(user.id);
  });

  it('should throw NotFoundException when user not found', async () => {
    vi.spyOn(mockRepository, 'findById').mockRejectedValue(
      new NotFoundException('Usuário não encontrado'),
    );

    await expect(service.execute('id-que-nao-existe')).rejects.toThrow(
      NotFoundException,
    );
  });
});

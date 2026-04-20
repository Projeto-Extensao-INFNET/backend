import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { GetUserProfileService } from '@Services/user/get-user-profile.service';

import { createFakeUser } from 'test/__shared__/factories';

describe('GetUserProfileService', () => {
  let service: GetUserProfileService;

  const mockRepository = {
    getProfile: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserProfileService,
        { provide: IUserRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<GetUserProfileService>(GetUserProfileService);
  });

  describe('Service', () => {
    it('service should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('execute', () => {
    it('should get user profile', async () => {
      const user = createFakeUser();
      mockRepository.getProfile.mockResolvedValue(user);

      const result = await service.execute(user.id);

      expect(result.id).toBe(user.id);
      expect(mockRepository.getProfile).toHaveBeenCalledWith(user.id);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockRepository.getProfile.mockRejectedValue(
        new NotFoundException('Usuário não encontrado'),
      );

      await expect(service.execute('id-que-nao-existe')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

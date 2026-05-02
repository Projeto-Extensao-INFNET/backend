import { Test, type TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { createFakeUser } from 'test/__shared__/factories';

import { IUserRepository } from '@/infra/database/prisma/repositories/prisma-user-repository';
import { UserService } from '@Services/user/user.service';

import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from '@/shared/constants';
import { users } from '@/utils';

import type { OmittedUserPassword } from '@/shared/types';
import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/presentation/dtos/pagination/pagination.dto';

describe('deleteAccount', () => {
  let service: UserService;

  const mockRepository = {
    findById: vi.fn(),
    deleteProfile: vi.fn(),
    editProfile: vi.fn(),
    getProfile: vi.fn(),
    getAllUsers: vi.fn(),
  };

  const paginatedUsers: PaginationResultDto<OmittedUserPassword> = {
    data: users,
    meta: {
      total_items: users.length,
      total_pages: Math.ceil(users.length / DEFAULT_PAGE_LIMIT),
      page: DEFAULT_PAGE_NUMBER,
      limit: DEFAULT_PAGE_LIMIT,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: IUserRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('Service', () => {
    it('service should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe(`${UserService.prototype.uploadAvatar.name}`, () => {
    it.todo('', () => {});
  });

  describe(`${UserService.prototype.getUsers.name}`, () => {
    it('should list all users', async () => {
      mockRepository.getAllUsers.mockResolvedValue(paginatedUsers);

      // Simula paginação
      const query: PaginationQueryDto = {
        page: DEFAULT_PAGE_NUMBER,
        limit: DEFAULT_PAGE_LIMIT,
      };

      const result = await service.getUsers(query);

      expect(result.data).toHaveLength(paginatedUsers.data.length);
      expect(result.meta.total_items).toBe(paginatedUsers.meta.total_items);
    });
  });

  describe(`${UserService.prototype.editProfile.name}`, () => {
    it('should edit user profile', async () => {
      // usuário que será usado para editar o perfil
      const user = createFakeUser();

      // dados que serão usados na edição do perfil
      const dto = { name: 'Novo nome' };

      // primeiro valida se o usuario existe
      mockRepository.findById(user);

      // simula o retorno do update
      mockRepository.editProfile.mockResolvedValue({
        ...user,
        ...dto,
      });

      // executa o método de editProfile no service
      const result: EditProfileDto = await service.editProfile(user.id, dto);

      // verifica se o update foi chamado com os dados corretos (vindos do DTO)
      expect(mockRepository.editProfile).toHaveBeenCalledWith(user.id, dto);
      // verifica se o novo campo editado aparece corretamente
      expect(result.name).toBe(dto.name);
    });
  });

  describe(`${UserService.prototype.getProfile.prototype.name}`, () => {
    it('should get user profile', async () => {
      const user = createFakeUser();
      mockRepository.getProfile.mockResolvedValue(user);

      const result = await service.getProfile(user.id);

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

  describe(`${UserService.prototype.deleteProfile.name}`, () => {
    it('should delete user profile', async () => {
      const user = createFakeUser();

      mockRepository.findById.mockResolvedValue(user);
      mockRepository.deleteProfile.mockResolvedValue({
        message: 'Usuário removido com sucesso!',
      });

      await service.deleteProfile(user.id);

      expect(mockRepository.findById).toHaveBeenCalledWith(user.id);
      expect(mockRepository.deleteProfile).toHaveBeenCalledWith(user.id);
    });

    it('should throw NotFoundException when user not found', async () => {
      vi.spyOn(mockRepository, 'findById').mockRejectedValue(
        new NotFoundException('Usuário não encontrado'),
      );

      await expect(service.deleteProfile('id-que-nao-existe')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

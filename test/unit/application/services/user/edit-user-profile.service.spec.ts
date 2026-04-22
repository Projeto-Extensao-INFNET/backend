import { Test, type TestingModule } from '@nestjs/testing';
import { EditUserProfileService } from '@Services/user/edit-user-profile.service';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import type { EditProfileDto } from '@/infra/http/dtos/user/edit-profile.dto';
import { createFakeUser } from 'test/__shared__/factories';

const mockUserRepository = {
  editProfile: vi.fn(),
  findById: vi.fn(),
};

describe('editProfile', () => {
  let service: EditUserProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditUserProfileService,
        { provide: IUserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<EditUserProfileService>(EditUserProfileService);
  });

  describe('Service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  it('should edit user profile', async () => {
    // usuário que será usado para editar o perfil
    const user = createFakeUser();

    // dados que serão usados na edição do perfil
    const dto = { name: 'Novo nome' };

    // primeiro valida se o usuario existe
    mockUserRepository.findById(user);

    // simula o retorno do update
    mockUserRepository.editProfile.mockResolvedValue({
      ...user,
      ...dto,
    });

    // executa o método de editProfile no service
    const result: EditProfileDto = await service.execute(user.id, dto);

    // verifica se o update foi chamado com os dados corretos (vindos do DTO)
    expect(mockUserRepository.editProfile).toHaveBeenCalledWith(user.id, dto);
    // verifica se o novo campo editado aparece corretamente
    expect(result.name).toBe(dto.name);
  });
});

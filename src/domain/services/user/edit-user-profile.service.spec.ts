import { CreateMockUser } from '@/test/mocks/create-mock-user/create-mock-user';
import { Test, type TestingModule } from '@nestjs/testing';
import { EditUserProfileService } from './edit-user-profile.service';
import {
  IUserRepository,
  PrismaUserRepository,
} from '@/core/repositories/prisma-user-repository';
import { PrismaService } from '@/infra/database/prisma.service';
import { MockPrismaService } from '@/test/mocks/prisma';

describe('editProfile', () => {
  let service: EditUserProfileService;
  const mockPrismaService = MockPrismaService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditUserProfileService,
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

    service = module.get<EditUserProfileService>(EditUserProfileService);
  });

  it('should edit user profile', async () => {
    const user = CreateMockUser;

    const dto = { name: 'Novo nome', email: 'novo@email.com' }; // dados que serão usados na edição do perfil

    // primeiro valida se o usuario existe
    mockPrismaService.user.findUnique.mockResolvedValue(user);

    // simula o retorno do update
    mockPrismaService.user.update.mockResolvedValue({
      ...user,
      ...dto,
    });

    // executa o método de editProfile no service
    const result = await service.editProfile(user.id, dto);

    // verifica se o update foi chamado com os dados corretos (vindos do DTO)

    expect(mockPrismaService.user.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: user.id }, data: dto }),
    );
    expect(result.name).toBe(dto.name); // verifica se o novo campo editado aparece corretamente
    expect(result.email).toBe(dto.email); // verifica se o novo campo editado aparece corretamente
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from '@/infra/database/repositories/prisma-user-repository';
import { GetAllUsersService } from './get-all-users.service';
import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/shared/dto/pagination/pagination.dto';
import type { UserEntity } from '@/core/entities/user.entity';
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from '@/shared/constants';
import { users } from '@/utils';

const mockUserRepository = {
  getAllUsers: vi.fn(),
};

const paginatedUsers: PaginationResultDto<Omit<UserEntity, 'password'>> = {
  data: users,
  meta: {
    total_items: users.length,
    total_pages: Math.ceil(users.length / DEFAULT_PAGE_LIMIT),
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_LIMIT,
  },
};

describe('GetAllUsersService', () => {
  let service: GetAllUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUsersService,
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<GetAllUsersService>(GetAllUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all users', async () => {
    mockUserRepository.getAllUsers.mockResolvedValue(paginatedUsers);

    // Simula paginação
    const query: PaginationQueryDto = {
      page: DEFAULT_PAGE_NUMBER,
      limit: DEFAULT_PAGE_LIMIT,
    };

    const result = await service.execute(query);

    expect(result.data).toHaveLength(paginatedUsers.data.length);
    expect(result.meta.total_items).toBe(paginatedUsers.meta.total_items);
  });
});

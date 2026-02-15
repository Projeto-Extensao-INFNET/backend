import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/infra/database/prisma.service';
import {
  IUserRepository,
  PrismaUserRepository,
} from '@/core/repositories/prisma-user-repository';
import { MockPrismaService } from '@/test/mocks/prisma';
import { GetAllUsersService } from './get-all-users.service';
import {
  generateBirthDate,
  generateUniqueCPF,
  generateUniqueEmail,
  generateUniqueName,
  generateUUID,
} from '@/utils';

describe('GetAllUsersService', () => {
  let service: GetAllUsersService;
  const mockPrismaService = MockPrismaService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUsersService,
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

    service = module.get<GetAllUsersService>(GetAllUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all users', async () => {
    const users = [
      {
        id: generateUUID(),
        name: generateUniqueName(),
        email: generateUniqueEmail(),
        role: 'PATIENT',
        document: generateUniqueCPF(),
        documentType: 'CPF',
        birthDate: generateBirthDate(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: generateUUID(),
        name: generateUniqueName(),
        email: generateUniqueEmail(),
        role: 'PATIENT',
        document: generateUniqueCPF(),
        documentType: 'CPF',
        birthDate: generateBirthDate(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: generateUUID(),
        name: generateUniqueName(),
        email: generateUniqueEmail(),
        role: 'PATIENT',
        document: generateUniqueCPF(),
        documentType: 'CPF',
        birthDate: generateBirthDate(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: generateUUID(),
        name: generateUniqueName(),
        email: generateUniqueEmail(),
        role: 'PATIENT',
        document: generateUniqueCPF(),
        documentType: 'CPF',
        birthDate: generateBirthDate(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5',
        name: generateUniqueName(),
        email: generateUniqueEmail(),
        role: 'PATIENT',
        document: generateUniqueCPF(),
        documentType: 'CPF',
        birthDate: new Date('1994-05-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockPrismaService.user.findMany.mockResolvedValue(users);

    // Simula paginação
    const query = { page: 1, limit: 5 };
    mockPrismaService.user.count.mockResolvedValue(users.length);

    const result = await service.execute(query);

    expect(result.data).toHaveLength(5);
    expect(result.meta.total_items).toBe(5);
  });
});

import {
  IProfessionalsRepository,
  PrismaProfessionalsRepository,
} from '@/core/repositories/prisma-professionals.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/infra/database/prisma.service';
import { MockPrismaService } from '@/test/mocks/prisma';
import { ListProfessionalsService } from './list-professionals.service';

describe('ProfessionalService', () => {
  let service: ListProfessionalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListProfessionalsService,
        {
          provide: IProfessionalsRepository,
          useClass: PrismaProfessionalsRepository,
        },
        {
          provide: PrismaService,
          useValue: MockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ListProfessionalsService>(ListProfessionalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO -> criar testes unitários
});

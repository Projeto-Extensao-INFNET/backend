import { Injectable } from '@nestjs/common';

import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from '@/shared/constants';

import { ok, type Result } from '@/shared/errors/result';

import { PrismaService } from '../prisma.service';
import { CacheService } from '@/infra/cache/cache.service';

import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/presentation/dtos/pagination/pagination.dto';
import type { ProfessionalModel } from '@/domain/models/professional.model';

export abstract class IProfessionalsRepository {
  abstract listProfessionals(
    params: PaginationQueryDto,
  ): Promise<Result<PaginationResultDto<ProfessionalModel>>>;
}

@Injectable()
export class PrismaProfessionalsRepository implements IProfessionalsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async listProfessionals(
    params: PaginationQueryDto,
  ): Promise<Result<PaginationResultDto<ProfessionalModel>>> {
    const { page = DEFAULT_PAGE_NUMBER, limit = DEFAULT_PAGE_LIMIT } = params;
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    // cria a cache key com a lista de profissionais e o ttl de 1min
    const CACHE_KEY = `professionals:page:${page}:limit:${limit}`;
    const TTL = 60 * 1000; // 60s

    // primeiro busca no cache
    const cachedProfessionals =
      await this.cache.get<PaginationResultDto<ProfessionalModel>>(CACHE_KEY);

    // se houver dados no cache os retorna
    if (cachedProfessionals) {
      return ok(cachedProfessionals);
    }

    const [professionals, total_items] = await this.prismaService.$transaction([
      // bate no banco se não tiver dados cacheados ou ttl expirar
      this.prismaService.professional.findMany({
        skip,
        take,
        select: {
          id: true,
          typeOfQuery: true,
          price: true,
          paymentMethod: true,
          document: true,
          documentType: true,
          gender: true,
          phone: true,
          userId: true,
          specialtyId: true,
          typeOfTreatmentId: true,
          user: {
            select: {
              name: true,
              email: true,
              createdAt: true,
              avatar: true,
              role: true,
            },
          },
          specialty: {
            select: {
              name: true,
            },
          },
          typeOfTreatment: {
            select: {
              name: true,
            },
          },
        },
      }),

      this.prismaService.professional.count(),
    ]);

    const total_pages = Math.ceil(total_items / take);

    const result: PaginationResultDto<ProfessionalModel> = {
      data: professionals,
      meta: {
        total_items,
        total_pages,
        page: Number(page),
        limit: Number(take),
      },
    };

    // salva no cache o payload de paginação completo
    await this.cache.set(CACHE_KEY, result, TTL);

    return ok(result);
  }
}

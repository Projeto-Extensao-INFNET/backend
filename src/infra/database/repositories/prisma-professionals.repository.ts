import { PrismaService } from '../prisma/prisma.service';
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from '@/shared/constants';
import type {
  PaginationQueryDto,
  PaginationResultDto,
} from '@/shared/dto/pagination/pagination.dto';
import { Injectable } from '@nestjs/common';
import type { ProfessionalEntity } from '@/core/entities/professional.entity';
import { CacheRepository } from '@/infra/cache/cache-repository';

export abstract class IProfessionalsRepository {
  abstract listProfessionals(
    params: PaginationQueryDto,
  ): Promise<PaginationResultDto<ProfessionalEntity>>;
}

@Injectable()
export class PrismaProfessionalsRepository implements IProfessionalsRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cache: CacheRepository,
  ) {}

  async listProfessionals(
    params: PaginationQueryDto,
  ): Promise<PaginationResultDto<ProfessionalEntity>> {
    const { page = DEFAULT_PAGE_NUMBER, limit = DEFAULT_PAGE_LIMIT } = params;

    const CACHE_KEY = `professionals:page:${page}:limit:${limit}`;

    const cacheHit = await this.cache.get(CACHE_KEY);

    if (cacheHit) {
      const cachedData = JSON.parse(cacheHit);

      return cachedData;
    }

    const take = Number(limit);
    const skip = Number(page - 1) * take; // page=1, take=10 resulta em skip=0 -> primeira página com 10 itens

    const professionals = await this.prismaService.professional.findMany({
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
    });

    const total_items = await this.prismaService.professional.count();
    const total_pages = Math.ceil(total_items / take);

    const result: PaginationResultDto<ProfessionalEntity> = {
      data: professionals,
      meta: {
        total_items,
        total_pages,
        page,
        limit,
      },
    };

    await this.cache.set(CACHE_KEY, JSON.stringify(result));

    return result;
  }
}

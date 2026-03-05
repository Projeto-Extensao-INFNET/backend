import { PaginationResultDto } from '@/shared/dto/pagination/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from '@/shared/constants';
import type { PaginationQueryDto } from '@/shared/dto/pagination/pagination.dto';
import { Injectable } from '@nestjs/common';
import type { ProfessionalEntity } from '@/core/entities/professional.entity';

export abstract class IProfessionalsRepository {
  abstract listProfessionals(
    params: PaginationQueryDto,
  ): Promise<PaginationResultDto<ProfessionalEntity>>;
}

@Injectable()
export class PrismaProfessionalsRepository implements IProfessionalsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async listProfessionals(
    params: PaginationQueryDto,
  ): Promise<PaginationResultDto<ProfessionalEntity>> {
    const { page = DEFAULT_PAGE_NUMBER, limit = DEFAULT_PAGE_LIMIT } = params;
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

    const total = await this.prismaService.professional.count();
    const totalPages = Math.ceil(total / take);

    return {
      data: professionals,
      meta: {
        total_items: total,
        total_pages: totalPages,
        page,
        limit,
      },
    };
  }
}

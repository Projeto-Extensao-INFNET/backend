import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@/core/repositories/user.repository';
import type { GetUserProfileDto } from '@/core/dto/user/get-user.dto';

@Injectable()
export class GetUserProfileService {
  constructor(private readonly repo: IUserRepository) {}

  async getUserProfile(
    userId: string,
  ): Promise<Omit<GetUserProfileDto, 'password'>> {
    const user = await this.repo.getProfile(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password: _, ...userWithoutPassword } = user; // não exibe a senha o listar os dados do usuário
    return userWithoutPassword;
  }
}

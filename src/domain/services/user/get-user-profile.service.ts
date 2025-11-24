import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/core/entities/user.entity';
import { UserRepository } from '@/infra/repositories/user.repository';

@Injectable()
export class GetUserProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserProfile(userId: string): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userRepository.getProfile(userId);

    const { password: _, ...userWithoutPassword } = user; // não exibe a senha o listar os dados do usuário
    return userWithoutPassword;
  }
}

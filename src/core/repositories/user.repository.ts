import type { Professional } from '../../../generated/prisma/client';
import type { UserEntity } from '../../core/entities/user.entity';
import type { EditProfileDto } from '@dtos/user/edit-profile.dto';
import type { GetUserProfileDto } from '../dto/user/get-user.dto';

// Cria um contrato que poderá ser usado por vários repositórios reais
export abstract class IUserRepository {
  abstract getProfile(userId: string): Promise<GetUserProfileDto | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract deleteProfile(id: string): Promise<void>;
  abstract editProfile(id: string, dto: EditProfileDto): Promise<UserEntity>;
  abstract listProfessionals(): Promise<Professional[]>; // vai pro repo de professionals
}

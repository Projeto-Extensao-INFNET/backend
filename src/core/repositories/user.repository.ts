import type { Professional } from 'generated/prisma';
import type { UserEntity } from '../entities/user.entity';
import type { EditProfileDto } from '../dto/user/edit-profile.dto';

// Cria um contrato que poderá ser usado por vários repositórios reais
export abstract class UserRepository {
  abstract getProfile(userId: string): Promise<UserEntity>;
  abstract findById(id: string): Promise<UserEntity>;
  abstract deleteProfile(id: string): Promise<void>;
  abstract editProfile(id: string, dto: EditProfileDto): Promise<UserEntity>;
  abstract listProfessionals(): Promise<Professional[]>; // vai pro repo de professionals
}

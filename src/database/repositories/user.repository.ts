import type { Professional } from 'generated/prisma';
import type { UserEntity } from '../../core/entities/user.entity';
import type { EditProfileDto } from '../../infra/http/dto/edit-profile.dto';

// Cria um repositório abstrato que poderá ser usado por vários repositórios reais
export abstract class UserRepository {
	abstract getProfile(userId: string): Promise<UserEntity>;
	abstract findById(id: string): Promise<UserEntity>;
	abstract deleteAccount(id: string): Promise<void>;
	abstract editProfile(id: string, dto: EditProfileDto): Promise<UserEntity>;
	abstract listProfessionals(): Promise<Professional[]>;
}

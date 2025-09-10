import type { Professional } from 'generated/prisma';
import type { EditProfileDto } from '../dto/edit-profile.dto';
import type { UserEntity } from '../entities/user.entity';

// Cria um repositório abstrato que poderá ser usado por vários repositórios reais
export abstract class UserRepository {
	abstract getProfile(userId: string): Promise<UserEntity>;
	abstract findById(id: string): Promise<UserEntity>;
	abstract deleteAccount(id: string): Promise<void>;
	abstract editProfile(id: string, dto: EditProfileDto): Promise<UserEntity>;
	abstract listProfessionals(): Promise<Professional[]>;
}

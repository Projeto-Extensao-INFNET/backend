import type { UserEntity } from '../entities/user.entity';

// Cria um repositório abstrato que poderá ser usado por vários repositórios reais
export abstract class UserRepository {
	abstract getProfile(userId: string): Promise<UserEntity>;
	abstract findById(id: string): Promise<UserEntity>;
	abstract deleteAccount(id: string): Promise<void>;
}

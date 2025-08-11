import type { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
	abstract getProfile(userId: string): Promise<UserEntity>;
	abstract findById(id: string): Promise<UserEntity>;
	abstract deleteAccount(id: string): Promise<void>;
}

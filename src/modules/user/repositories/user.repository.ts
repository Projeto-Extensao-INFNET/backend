import type { Professional } from 'generated/prisma';
import type { UserEntity } from '../entities/user.entity';

// Cria um repositório abstrato que poderá ser usado por vários repositórios reais
export abstract class UserRepository {
	abstract getProfile(userId: string): Promise<UserEntity>;
	abstract findById(id: string): Promise<UserEntity>;
	abstract deleteAccount(id: string): Promise<void>;
	abstract listProfessionals(): Promise<Professional[]>; // !! Criar uma entidade depois para nao depender do prisma
	abstract editProfile(id: string): Promise<UserEntity>; // !! editar parâmetros e retorno
}

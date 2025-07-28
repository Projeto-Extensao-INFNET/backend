import { compare, hash } from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 8;
	return hash(password, saltRounds);
};

export const comparePassword = async (
	password: string,
	hash: string,
): Promise<boolean> => {
	return compare(password, hash);
};

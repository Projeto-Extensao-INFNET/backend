import { compare, hash } from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const SALT_ROUNDS = 8;
  return hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return compare(password, hash);
};

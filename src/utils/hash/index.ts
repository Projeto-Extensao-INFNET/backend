import { SALT_ROUNDS } from '@/shared/constants';
import { compare, hash } from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return compare(password, hash);
};

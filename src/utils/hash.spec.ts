import { comparePassword, hashPassword } from './hash';

describe('Hash Password', () => {
	it('should hash password correctly', async () => {
		const password = '12345678';

		const hashedPassword = await hashPassword(password);

		const isPasswordHashed = await comparePassword(
			password,
			hashedPassword,
		);

		const isPasswordWrong = await comparePassword(
			hashedPassword,
			'87654321',
		);

		expect(hashedPassword).not.toBe(password);
		expect(hashedPassword).toBeDefined();
		expect(isPasswordHashed).toBe(true);
		expect(isPasswordWrong).toBe(false);
	});
});

import { generateUUID } from './generateUUID';

describe('Generate UUID', () => {
	it('should generate a UUID', async () => {
		const uuid = generateUUID();

		expect(uuid).toBeDefined();
		expect(typeof uuid).toBe('string');
		expect(uuid.length).toBe(36);
	});
});

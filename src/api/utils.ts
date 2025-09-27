export const generateToken = (size: number): string => {
	const array = new Uint8Array(size);
	crypto.getRandomValues(array);
	return Array.from(array)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
};

export function randomInt(min: number, max: number): number {
	const range = max - min;
	if (range <= 0) throw new Error('max must be greater than min');

	const randomBuffer = new Uint32Array(1);
	crypto.getRandomValues(randomBuffer);
	return min + (randomBuffer[0] % range);
}

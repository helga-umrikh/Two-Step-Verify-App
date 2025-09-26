import { CSSProperties } from 'react';

const AlignCenter: CSSProperties = {
	textAlign: 'center',
};

const titleLg: CSSProperties = {
	width: 376,
	...AlignCenter,
};

const titleSm: CSSProperties = {
	width: '100%',
	...AlignCenter,
};

const text = { display: 'block', marginBottom: 25, ...AlignCenter };

const textLg: CSSProperties = {
	...text,
	padding: '0 2rem',
	fontSize: 16,
};

const textSm: CSSProperties = {
	...text,
	width: '100%',
};

const prevStepButton: CSSProperties = {
	position: 'absolute',
};

export { prevStepButton, textLg, textSm, titleLg, titleSm };

import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{
		ignores: ['eslint.config.mts', '.prettierrc'],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: { globals: globals.browser },
	},
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
			react,
		},
		rules: {
			'sort-imports': 'off',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// react всегда первым
						['^react$'],
						// сторонние пакеты
						['^@?\\w'],
						// алиасы проекта
						['^@components'],
						// локальные файлы, кроме стилей
						['^\\.(?!.*\\.(css|scss|less)$)'],
						// стили последними
						['^.+\\.(css|scss|less)$'],
					],
				},
			],
			'simple-import-sort/exports': 'error',
		},
	},
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
]);

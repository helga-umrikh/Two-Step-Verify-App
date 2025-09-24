import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  {
		ignores: ['public/build', 'eslint.config.mts', '.prettierrc', ],
	},
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    plugins: { js }, extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser } 
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
					groups: [['^react$', '^@?\\w'], ['^@components', '^@pages', '^@utils'], ['^\\.']],
				},
			],
			'simple-import-sort/exports': 'error',
		},
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
// @ts-expect-error
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
	plugins: [react(), eslintPlugin()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, '../src/components'),
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	build: {
		sourcemap: true,
	},
});

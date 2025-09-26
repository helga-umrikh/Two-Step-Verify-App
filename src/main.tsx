import React, { StrictMode } from 'react';

import { ConfigProvider } from 'antd';
import { createRoot, Root } from 'react-dom/client';

import App from './App';

import './index.css';

const rootContainer = document.getElementById('root');

if (!rootContainer) {
	console.error('Элемент с id "root" не найден');
	throw new Error('Root container not found');
}
const root: Root = createRoot(rootContainer);

root.render(
	<StrictMode>
		<ConfigProvider theme={{ cssVar: true }}>
			<App />
		</ConfigProvider>
	</StrictMode>
);

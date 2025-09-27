import React from 'react';

import { ConfigProvider } from 'antd';
import { createRoot, Root } from 'react-dom/client';
import { Provider } from 'react-redux';

import { worker } from './api/browser';
import App from './App';
import { store } from './redux/store';

import './index.css';

const rootContainer = document.getElementById('root');

if (!rootContainer) {
	console.error('Элемент с id "root" не найден');
	throw new Error('Root container not found');
}
const root: Root = createRoot(rootContainer);

if (process.env.NODE_ENV === 'development') {
	worker.start({
		serviceWorker: {
			url: '/mockServiceWorker.js',
		},
	});
}

root.render(
	<Provider store={store}>
		<ConfigProvider theme={{ cssVar: true }}>
			<App />
		</ConfigProvider>
	</Provider>
);

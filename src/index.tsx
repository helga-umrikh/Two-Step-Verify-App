import { StrictMode } from 'react';
import { Root, createRoot } from 'react-dom/client';

import { App } from './App';

const rootContainer = document.getElementById('root');

if (!rootContainer) {
	console.error('Элемент с id "root" не найден');
	throw new Error('Root container not found');
}
const root: Root = createRoot(rootContainer);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

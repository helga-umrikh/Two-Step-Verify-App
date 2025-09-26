import React from 'react';

import { Flex, Layout } from 'antd';

import Authentication from '@components/Authentication/Authentication';

export function App() {
	return (
		<Layout style={{ minHeight: 'inherit' }}>
			<Flex vertical align='center' justify='center' style={{ minHeight: 'inherit' }}>
				<Authentication />
			</Flex>
		</Layout>
	);
}

export default App;

import React from 'react';

import { Flex, Layout } from 'antd';

import AuthenticationCard from '@components/Authentication/AuthenticationCard';

export function App() {
	return (
		<Layout style={{ minHeight: 'inherit' }}>
			<Flex vertical align='center' justify='center' style={{ minHeight: 'inherit' }}>
				<AuthenticationCard />
			</Flex>
		</Layout>
	);
}

export default App;

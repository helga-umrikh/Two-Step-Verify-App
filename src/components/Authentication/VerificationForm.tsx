import React from 'react';

import { Button, Form, Grid, Input, Typography } from 'antd';

import { textLg, textSm, titleLg, titleSm } from './styles';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

export const VerificationForm = () => {
	const screens = useBreakpoint();

	return (
		<Form layout='vertical'>
			<Title
				level={screens.md ? 3 : 5}
				style={screens.md ? { ...titleLg, marginBottom: 0 } : titleSm}
			>
				Two-Factor Authentication
			</Title>
			<Text style={screens.md ? textLg : textSm}>
				Enter the 6-digit code from the Google Authenticator app
			</Text>
			<Form.Item style={{ display: 'Flex', alignItems: 'center', justifyContent: 'center' }}>
				<Input.OTP length={6} status='' />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' block>
					Continue
				</Button>
				<Button color='default' variant='text' block>
					Get a new code in 00:45
				</Button>
			</Form.Item>
		</Form>
	);
};

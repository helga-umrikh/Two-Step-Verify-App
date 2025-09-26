import React from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Grid, Input, Typography } from 'antd';

import { titleLg, titleSm } from './styles';

const { Title } = Typography;
const { useBreakpoint } = Grid;

export const LogInForm = () => {
	const screens = useBreakpoint();

	return (
		<Form layout='vertical'>
			<Title level={screens.md ? 3 : 5} style={screens.md ? titleLg : titleSm}>
				Sign in to your account to continue
			</Title>
			<Form.Item name='email' rules={[{ required: true }]}>
				<Input placeholder='Email' prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} />
			</Form.Item>
			<Form.Item name='password' rules={[{ required: true }]}>
				<Input.Password
					placeholder='Password'
					prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
				/>
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' block>
					Log in
				</Button>
			</Form.Item>
		</Form>
	);
};

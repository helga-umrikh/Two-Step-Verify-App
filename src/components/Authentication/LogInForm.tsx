import React from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Grid, Input, Typography } from 'antd';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setLogInFormData } from '../../redux/slices/LogInFromSlice';
import { titleLg, titleSm } from './styles';
import { SubmitButton } from './SubmitButton';

const { Title } = Typography;
const { useBreakpoint } = Grid;

type TFormValues = {
	email: string;
	password: string;
};

export const LogInForm = () => {
	const screens = useBreakpoint();
	const dispatch = useAppDispatch();
	const email = useAppSelector((state) => state.authData.email);

	const onFinishForm = (values: TFormValues) => {
		dispatch(setLogInFormData({ email: values.email, password: values.password }));
	};

	const [form] = Form.useForm();

	return (
		<Form form={form} layout='vertical' onFinish={onFinishForm}>
			<Title level={screens.md ? 3 : 5} style={screens.md ? titleLg : titleSm}>
				Sign in to your account to continue
			</Title>
			<Form.Item
				name='email'
				rules={[
					{ required: true, message: ' email is required' },
					{
						validator: (_, value) => {
							const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
							if (!value || emailRegex.test(value)) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('Incorrect email'));
						},
					},
				]}
			>
				<Input
					placeholder='Email'
					prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} value={email ?? undefined} />}
				/>
			</Form.Item>
			<Form.Item name='password' rules={[{ required: true }]}>
				<Input.Password
					placeholder='Password'
					prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
				/>
			</Form.Item>
			<Form.Item shouldUpdate>
				<SubmitButton form={form}>Log in</SubmitButton>
			</Form.Item>
		</Form>
	);
};

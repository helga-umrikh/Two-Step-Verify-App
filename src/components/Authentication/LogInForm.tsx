import React from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Grid, Input, message, Spin, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { useFetchPrimaryAuthStepMutation } from '../../api/AuthService';
import { setAuthFormData } from '../../redux/slices/AuthSlice';
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
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useDispatch();
	const [fetchPrimaryAuthStep, { data, isLoading, isError }] = useFetchPrimaryAuthStepMutation();

	const displayErrorMessage = (errorMessage: string) => {
		messageApi.open({
			type: 'error',
			content: `${errorMessage}`,
		});
	};

	const onFinishForm = async (values: TFormValues) => {
		try {
			fetchPrimaryAuthStep(values).unwrap();
		} catch (err) {
			console.error(err);
			form.resetFields();
			displayErrorMessage('Authentication error');
		}
	};

	const [form] = Form.useForm();

	if (!isLoading && data) {
		dispatch(setAuthFormData({ primaryStep: { ...data } }));
	}

	if (isError) {
		form.resetFields();
		displayErrorMessage('Authentication error');
	}

	return (
		<Spin spinning={isLoading}>
			<Form form={form} layout='vertical' onFinish={onFinishForm}>
				<>{contextHolder}</>
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
						prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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
		</Spin>
	);
};

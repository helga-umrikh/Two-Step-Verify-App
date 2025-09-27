import React from 'react';

import { Button, Form, Grid, Input, message, Spin, Typography } from 'antd';

import { useFetchSecondaryAuthStepMutation } from '../../api/AuthService';
import { EAuthStage, TVerification } from '../../api/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearAuthFormData, setAuthStage, setAuthUserData } from '../../redux/slices/AuthSlice';
import { textLg, textSm, titleLg, titleSm } from './styles';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

export const VerificationForm = () => {
	const screens = useBreakpoint();
	const dispatch = useAppDispatch();
	const [messageApi, contextHolder] = message.useMessage();
	const challengeId = useAppSelector((state) => state.authData.primaryStep.challengeId);
	const [fetchSecondaryAuthStep, { data, isLoading, isError }] =
		useFetchSecondaryAuthStepMutation();

	const displayErrorMessage = (errorMessage: string) => {
		messageApi.open({
			type: 'error',
			content: `${errorMessage}`,
		});
	};

	const handleInputChange = (code: string) => {
		const codeInt = Number(code);

		const verificationData: TVerification = { challengeId: challengeId ?? '', code: codeInt };

		try {
			fetchSecondaryAuthStep(verificationData).unwrap();
		} catch (err) {
			console.error(err);
			form.resetFields();
			displayErrorMessage('Authentication error');
		}
	};
	const [form] = Form.useForm();

	if (data) {
		dispatch(setAuthUserData(data.user));
		dispatch(setAuthStage(EAuthStage.AUTHORIZED));
		dispatch(clearAuthFormData());
	}

	if (isError) {
		form.resetFields();
		displayErrorMessage('Invalid code');
	}

	return (
		<Spin spinning={isLoading}>
			<Form layout='vertical' form={form}>
				<>{contextHolder}</>
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
					<Input.OTP length={6} status={isError ? 'error' : ''} onChange={handleInputChange} />
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
		</Spin>
	);
};

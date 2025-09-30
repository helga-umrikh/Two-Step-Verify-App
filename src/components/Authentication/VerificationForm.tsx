import React, { useEffect, useState } from 'react';

import { Button, Form, Grid, Input, message, Spin, Typography } from 'antd';

import {
	useFetchPrimaryAuthStepMutation,
	useFetchSecondaryAuthStepMutation,
} from '../../api/AuthService';
import { EAuthStage, TVerification } from '../../api/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	clearAuthFormData,
	clearAuthPrimaryStepData,
	setAuthPrimaryRetry,
	setAuthStage,
	setAuthUserData,
} from '../../redux/slices/AuthSlice';
import { textLg, textSm, titleLg, titleSm } from './styles';
import { SubmitButton } from './SubmitButton';

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

export const VerificationForm = () => {
	const screens = useBreakpoint();
	const dispatch = useAppDispatch();
	const [messageApi, contextHolder] = message.useMessage();
	const { challengeId, retryAfter } = useAppSelector((state) => state.authData.primaryStep);
	const [fetchPrimaryAuthStep, { data: retrydata, isSuccess: isRetryFinished }] =
		useFetchPrimaryAuthStepMutation();
	const [fetchSecondaryAuthStep, { data, isLoading, isError }] =
		useFetchSecondaryAuthStepMutation();
	const [isOtpInputFilled, setIsOtpInputFilled] = useState<boolean>(false);
	const logInData = useAppSelector((state) => state.authData.formData);
	const retryAfterMsValue = retryAfter && new Date(retryAfter).getTime();
	const [counter, setCounter] = useState(45);
	const canRetry = counter === 0;

	const handleIOnOtpnput = (values: string[]) => {
		setIsOtpInputFilled(values.length === 6);
	};

	const displayErrorMessage = (errorMessage: string) => {
		messageApi.open({
			type: 'error',
			content: `${errorMessage}`,
		});
	};

	const handleOnOtpChange = (code: string) => {
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

	const handleOnClickResendCode = () => {
		try {
			if (logInData && challengeId && canRetry) {
				fetchPrimaryAuthStep({ challengeId, ...logInData }).unwrap();
			}
		} catch (err) {
			console.error(err);
			dispatch(clearAuthPrimaryStepData());
			dispatch(clearAuthFormData());
			displayErrorMessage('Authentication error');
		}
	};

	useEffect(() => {
		if (!retryAfterMsValue) return;

		const tick = () => {
			const diff = Math.max(0, Math.floor((retryAfterMsValue - Date.now()) / 1000));
			setCounter(diff);
			if (diff === 0) clearInterval(interval);
		};

		tick();
		const interval = setInterval(tick, 1000);
		return () => clearInterval(interval);
	}, [retryAfterMsValue]);

	const [form] = Form.useForm();

	if (data) {
		dispatch(setAuthUserData(data.user));
		dispatch(setAuthStage(EAuthStage.AUTHORIZED));
		dispatch(clearAuthPrimaryStepData());
	}

	if (isRetryFinished && retrydata) {
		dispatch(setAuthPrimaryRetry(retrydata.retryAfter));
	}

	useEffect(() => {
		if (isError) {
			form.resetFields();
			displayErrorMessage('Invalid code');
		}
	}, [isError]);

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
					<Input.OTP
						length={6}
						status={isError ? 'error' : ''}
						onInput={handleIOnOtpnput}
						onChange={handleOnOtpChange}
					/>
				</Form.Item>
				<Form.Item>
					{isOtpInputFilled ? (
						<SubmitButton submitable={!isError}>Continue</SubmitButton>
					) : (
						<Button
							color='default'
							type={counter ? 'text' : 'primary'}
							block
							onClick={handleOnClickResendCode}
							disabled={!!counter}
						>
							{counter
								? ` Get a new code in 00:${counter < 10 ? `0${counter}` : counter}`
								: 'Get new code'}
						</Button>
					)}
				</Form.Item>
			</Form>
		</Spin>
	);
};

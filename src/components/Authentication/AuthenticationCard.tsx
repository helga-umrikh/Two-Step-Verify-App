import React from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Image } from 'antd';

import { EAuthStage } from '../../api/types';
import companyLogo from '../../assets/company_logo.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearAuthFormData, clearAuthPrimaryStepData } from '../../redux/slices/AuthSlice';
import { LogInForm } from './LogInForm';
import { prevStepButton } from './styles';
import SuccessResultMessage from './SuccessResultMessage';
import { VerificationForm } from './VerificationForm';

import './styles.css';

const AuthenticationCard = () => {
	const challengeId = useAppSelector((state) => state.authData.primaryStep.challengeId);
	const isAuthorized = useAppSelector((state) => state.authData.status) === EAuthStage.AUTHORIZED;
	const dispatch = useAppDispatch();

	const handleToPrimaryStep = () => {
		dispatch(clearAuthPrimaryStepData());
		dispatch(clearAuthFormData());
	};


	return (
		<Card className='auth-card'>
			{challengeId && (
				<Button
					type='text'
					icon={<ArrowLeftOutlined />}
					style={prevStepButton}
					onClick={handleToPrimaryStep}
				/>
			)}
			<Flex justify='center' style={{ marginTop: 20 }}>
				<Image src={companyLogo} width={100} height={24} preview={false} alt='text' />
			</Flex>
			{isAuthorized ? <SuccessResultMessage /> : challengeId ? <VerificationForm /> : <LogInForm />}
		</Card>
	);
};

export default AuthenticationCard;

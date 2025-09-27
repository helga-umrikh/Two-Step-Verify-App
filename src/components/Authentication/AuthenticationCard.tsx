import React from 'react';

import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Image, notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

import { VERIFICATION_CODE } from '../../api/mockData';
import companyLogo from '../../assets/company_logo.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearAuthFormData } from '../../redux/slices/AuthSlice';
import { LogInForm } from './LogInForm';
import { prevStepButton } from './styles';
import { VerificationForm } from './VerificationForm';

import './styles.css';

const AuthenticationCard = () => {
	const challengeId = useAppSelector((state) => state.authData.primaryStep.challengeId);
	const isAuthorized = useAppSelector((state) => state.authData.status);
	const dispatch = useAppDispatch();
	const [api, contextHolder] = notification.useNotification();
	const Context = React.createContext({ name: 'Default' });

	const handleToPrimaryStep = () => {
		dispatch(clearAuthFormData());
	};

	//имитация письма на почту с кодом
	const openNotification = (placement: NotificationPlacement) => {
		api.info({
			message: `Mail:`,
			description: (
				<Context.Consumer>
					{() => `Hi, here is your verification code! ${VERIFICATION_CODE} `}
				</Context.Consumer>
			),
			placement,
			icon: <MailOutlined style={{ color: '#108ee9' }} />,
		});
	};

	if (challengeId) {
		openNotification('topLeft');
	}

	return (
		<Card className='auth-card'>
			{contextHolder}
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
			{isAuthorized ? <div></div> : challengeId ? <VerificationForm /> : <LogInForm />}
		</Card>
	);
};

export default AuthenticationCard;

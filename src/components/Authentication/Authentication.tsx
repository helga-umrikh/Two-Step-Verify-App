import React from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Image } from 'antd';

import companyLogo from '../../assets/company_logo.png';
import { LogInForm } from './LogInForm';
import { prevStepButton } from './styles';

import './styles.css';

const Authentication = () => {

	return (
		<Card className='auth-card'>
			<Button type='text' icon={<ArrowLeftOutlined />} style={prevStepButton} />
			<Flex justify='center' style={{ marginTop: 20 }}>
				<Image src={companyLogo} width={100} height={24} preview={false} alt='text' />
			</Flex>
			<LogInForm />
		</Card>
	);
};

export default Authentication;

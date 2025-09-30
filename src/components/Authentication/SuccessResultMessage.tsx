import React from 'react';

import { Result } from 'antd';

import { useAppSelector } from '../../redux/hooks';

const SuccessResultMessage = () => {
	const userName = useAppSelector((state) => state.authData.userData.name);
	return (
		<Result
			status='success'
			title={`Welcome back, ${userName}!`}
			subTitle="You've successfully Authenticated!"
		/>
	);
};

export default SuccessResultMessage;

import React from 'react';

import { MailOutlined } from '@ant-design/icons';
import { Flex, Layout, notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

import AuthenticationCard from '@components/Authentication/AuthenticationCard';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { clearMail, TMail } from './redux/slices/MailSlice';

export function App() {
	const [api, contextHolder] = notification.useNotification();
	const Context = React.createContext({ name: 'Default' });
	const dispatch = useAppDispatch();
	const mailBox = useAppSelector((state) => state.mailData.mail);

	const openNotification = (placement: NotificationPlacement, mailbox: TMail[]) => {
		mailbox.forEach((email) =>
			api.info({
				message: `Mail:${email.sender}`,
				description: (
					<Context.Consumer key={email.id}>
						{() => `Hi ${email.receiver}, here is your verification code! ${email.code} `}
					</Context.Consumer>
				),
				placement,
				duration: 45,
				icon: <MailOutlined style={{ color: '#108ee9' }} />,
			})
		);
		dispatch(clearMail());
	};

	if (mailBox && mailBox.length > 0) {
		openNotification('topLeft', mailBox);
	}

	return (
		<Layout style={{ minHeight: 'inherit' }}>
			{contextHolder}
			<Flex vertical align='center' justify='center' style={{ minHeight: 'inherit' }}>
				<AuthenticationCard />
			</Flex>
		</Layout>
	);
}

export default App;

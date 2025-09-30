import React, { FC, ReactNode } from 'react';

import { Button, Form, FormInstance } from 'antd';

type TSubmitButtonProps = {
	submitable: boolean;
	children?: ReactNode;
};

export const SubmitButton: FC<TSubmitButtonProps> = ({ submitable, children }) => {
	return (
		<Button type='primary' htmlType='submit' disabled={!submitable} style={{ width: '100%' }} block>
			{children}
		</Button>
	);
};

type TSubmitFormButtonProps = {
	form: FormInstance;
};

export const SubmitFormButton: FC<React.PropsWithChildren<TSubmitFormButtonProps>> = ({
	form,
	children,
}) => {
	const [submitable, setSubmitable] = React.useState<boolean>(false);

	const values = Form.useWatch([], form);

	React.useEffect(() => {
		form
			.validateFields({ validateOnly: true })
			.then(() => setSubmitable(true))
			.catch(() => setSubmitable(false));
	}, [form, values]);

	return <SubmitButton submitable={submitable}>{children}</SubmitButton>;
};

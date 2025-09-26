import React from 'react';

import { Button, Form, FormInstance } from 'antd';

interface SubmitButtonProps {
	form: FormInstance;
}

export const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
	form,
	children,
}) => {
	const [submittable, setSubmittable] = React.useState<boolean>(false);

	const values = Form.useWatch([], form);

	React.useEffect(() => {
		form
			.validateFields({ validateOnly: true })
			.then(() => setSubmittable(true))
			.catch(() => setSubmittable(false));
	}, [form, values]);

	return (
		<Button type='primary' htmlType='submit' disabled={!submittable} style={{ width: '100%' }}>
			{children}
		</Button>
	);
};

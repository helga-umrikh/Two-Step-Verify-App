import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TMail = {
	id: number;
	code: number;
	sender: string;
	receiver: string;
};

interface IMailState {
	mail: TMail[]
}

const initialState: IMailState = {
	mail: [],
};

const MailSlice = createSlice({
	name: 'mailSlice',
	initialState,
	reducers: {
		addMail(state, action: PayloadAction<TMail>) {
			state.mail?.push(action.payload);
		},

		clearMail(state) {
			state.mail = [];
		},
	},
});

export const { addMail, clearMail } = MailSlice.actions;
export default MailSlice.reducer;

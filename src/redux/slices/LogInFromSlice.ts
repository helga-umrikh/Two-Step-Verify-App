import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LogInFormState {
	email: string | null;
	password: string | null;
}

const initialState: LogInFormState = {
	email: null,
	password: null,
};

const logInDataSlice = createSlice({
	name: 'logInData',
	initialState,
	reducers: {
		setLogInFormData(state, action: PayloadAction<LogInFormState>) {
			state.email = action.payload.email;
			state.password = action.payload.password;
		},
		clearLogInFormData(state) {
			state.email = null;
			state.password = null;
		},
	},
});

export const { setLogInFormData, clearLogInFormData } = logInDataSlice.actions;
export default logInDataSlice.reducer;

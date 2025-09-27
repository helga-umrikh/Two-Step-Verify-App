import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TPrimaryStep = {
	challengeId: string | null;
	methods: string[] | null;
	requires2FA: boolean | null;
};

interface AuthFormState {
	primaryStep: TPrimaryStep;
}

const initialState: AuthFormState = {
	primaryStep: {
		challengeId: null,
		methods: null,
		requires2FA: null,
	},
};

const AuthDataSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setAuthFormData(state, action: PayloadAction<AuthFormState>) {
			state.primaryStep = { ...action.payload.primaryStep };
		},
		clearAuthFormData(state) {
			state.primaryStep = {
				challengeId: null,
				methods: null,
				requires2FA: null,
			};
		},
	},
});

export const { setAuthFormData, clearAuthFormData } = AuthDataSlice.actions;
export default AuthDataSlice.reducer;

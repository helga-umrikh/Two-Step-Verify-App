import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EAuthStage } from '../../api/types';

type TFormData = {
	email: string;
	password: string;
	challengeId?: string | null;
};

type TPrimaryStep = {
	challengeId: string | null;
	methods: string[] | null;
	requires2FA: boolean | null;
	retryAfter: string | null;
};

type TUserData = {
	id: number | null;
	name: string | null;
	email: string | null;
};
interface IAuthFormState {
	status: EAuthStage;
	formData: TFormData | null;
	primaryStep: TPrimaryStep;
	userData: TUserData;
}

const initialState: IAuthFormState = {
	status: EAuthStage.UNAUTHORIZED,
	formData: null,
	primaryStep: {
		challengeId: null,
		methods: null,
		requires2FA: null,
		retryAfter: null,
	},
	userData: {
		id: null,
		name: null,
		email: null,
	},
};

const AuthDataSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setAuthStage(state, action: PayloadAction<EAuthStage>) {
			state.status = action.payload;
		},
		setAuthFormData(state, action: PayloadAction<TFormData>) {
			state.formData = { ...action.payload };
		},
		setAuthPrimaryStep(state, action: PayloadAction<TPrimaryStep>) {
			state.primaryStep = {
				...action.payload,
			};
		},
		setAuthPrimaryRetry(state, action: PayloadAction<string>) {
			state.primaryStep.retryAfter = action.payload;
		},
		setAuthUserData(state, action: PayloadAction<TUserData>) {
			state.userData = { ...action.payload };
		},
		clearAuthFormData(state) {
			state.formData = null;
		},
		clearAuthPrimaryStepData(state) {
			state.primaryStep = {
				challengeId: null,
				methods: null,
				requires2FA: null,
				retryAfter: null,
			};
		},
	},
});

export const {
	setAuthStage,
	setAuthFormData,
	setAuthPrimaryStep,
	setAuthPrimaryRetry,
	setAuthUserData,
	clearAuthFormData,
	clearAuthPrimaryStepData,
} = AuthDataSlice.actions;
export default AuthDataSlice.reducer;

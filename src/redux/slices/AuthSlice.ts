import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EAuthStage } from '../../api/types';

type TPrimaryStep = {
	challengeId: string | null;
	methods: string[] | null;
	requires2FA: boolean | null;
};

type TUserData = {
	id: number | null;
	name: string | null;
	email: string | null;
};
interface IAuthFormState {
	status: EAuthStage;
	primaryStep: TPrimaryStep;
	userData: TUserData;
}

const initialState: IAuthFormState = {
	status: EAuthStage.UNAUTHORIZED,
	primaryStep: {
		challengeId: null,
		methods: null,
		requires2FA: null,
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
		setAuthFormData(state, action: PayloadAction<TPrimaryStep>) {
			state.primaryStep = {
				...action.payload,
			};
		},
		setAuthUserData(state, action: PayloadAction<TUserData>) {
			state.userData = { ...action.payload };
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

export const { setAuthStage, setAuthFormData, setAuthUserData, clearAuthFormData } =
	AuthDataSlice.actions;
export default AuthDataSlice.reducer;

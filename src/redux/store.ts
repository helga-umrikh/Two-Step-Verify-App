import { configureStore } from '@reduxjs/toolkit';

import { AuthAPI } from '../api/AuthService';
import AuthDataSliceReducer from './slices/AuthSlice';
import MailSliceReducer from './slices/MailSlice';

export const store = configureStore({
	reducer: {
		authData: AuthDataSliceReducer,
		mailData: MailSliceReducer,
		[AuthAPI.reducerPath]: AuthAPI.reducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

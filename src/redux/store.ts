import { configureStore } from '@reduxjs/toolkit';

import { AuthAPI } from '../api/AuthService';
import logInFormDataReducer from './slices/AuthSlice';

export const store = configureStore({
	reducer: {
		authData: logInFormDataReducer,
		[AuthAPI.reducerPath]: AuthAPI.reducer,
	},

	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

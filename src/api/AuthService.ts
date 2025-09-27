import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

import { TUserCredencials, TUserTokens, TVerification } from './types';

export const AuthAPI = createApi({
	reducerPath: 'AuthAPI',
	baseQuery: graphqlRequestBaseQuery({ url: '/graphql' }),
	endpoints: (builder) => ({
		// отправляем email + pass - получаем challengeId
		fetchPrimaryAuthStep: builder.mutation<
			{ requires2FA: boolean; methods: string[]; challengeId: string },
			TUserCredencials
		>({
			query: ({ email, password }) => ({
				document: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              requires2FA
              methods
              challengeId
            }
          }
        `,
				variables: { email, password },
			}),
		}),

		//отправляем challengeId + code - получаем токены
		fetchSecondaryAuthStep: builder.mutation<TUserTokens, TVerification>({
			query: ({ challengeId, code }) => ({
				document: `
          mutation Verify-2fa($challengeId: String!, $code: Int!) {
            verify-2fa(challengeId: $challengeId, code: $code) {
              access_token
              refresh_token
              user {
                id
                email
              }
            }
          }
        `,
				variables: { challengeId, code },
			}),
		}),
	}),
});

export const { useFetchPrimaryAuthStepMutation, useFetchSecondaryAuthStepMutation } = AuthAPI;

import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

import { TPrimaryLog, TUserCredencials, TUserTokens, TVerification } from './types';

export const AuthAPI = createApi({
	reducerPath: 'AuthAPI',
	baseQuery: graphqlRequestBaseQuery({ url: '/graphql' }),
	endpoints: (builder) => ({
		fetchPrimaryAuthStep: builder.mutation<TPrimaryLog, TUserCredencials>({
			query: ({ email, password, challengeId }) => ({
				document: `
          mutation Login($email: String!, $password: String!, $challengeId: String) {
        login(email: $email, password: $password, challengeId: $challengeId) {
              requires2FA
              methods
              challengeId
              retryAfter
            }
          }
        `,
				variables: { email, password, challengeId },
			}),
		}),

		fetchSecondaryAuthStep: builder.mutation<TUserTokens, TVerification>({
			query: ({ challengeId, code }) => ({
				document: `
          mutation Verify2fa($challengeId: String!, $code: Int!) {
            verify2fa(challengeId: $challengeId, code: $code) {
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

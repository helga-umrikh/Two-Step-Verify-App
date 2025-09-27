import { graphql, HttpResponse } from 'msw';

import { UserDB } from './mockData';
import { generateToken, randomInt } from './utils';

const challenges: Record<string, { code: number; userEmail: string }> = {};

export const handlers = [
	graphql.mutation('Login', ({ variables }) => {
		const { email, password } = variables;
		const validationEmailExistence = UserDB.find(
			(userData) => email === userData.email && userData
		);

		if (validationEmailExistence) {
			const isValidPassword = password === validationEmailExistence.password;

			if (isValidPassword) {
				const challengeId = crypto.randomUUID();
				const verificationCode = randomInt(0, 6);

				challenges[challengeId] = {
					code: verificationCode,
					userEmail: email,
				};

				return HttpResponse.json({
					data: {
						requires2FA: true,
						methods: ['totp', 'sms'],
						challengeId: challengeId,
					},
				});
			}

			return HttpResponse.error();
		}

		return HttpResponse.error();
	}),

	graphql.mutation('Verify-2fa', ({ variables }) => {
		const { challengeId, code } = variables;

		if (challenges[challengeId]) {
			if (challengeId[challengeId].code === code) {
				const accessToken = generateToken(32);
				const refreshToken = generateToken(64);

				return HttpResponse.json({
					data: {
						access_token: accessToken,
						refresh_token: refreshToken,
						user: {
							id: 1,
							email: challenges[challengeId].userEmail,
						},
					},
				});
			}

			return HttpResponse.error();
		}

		return HttpResponse.error();
	}),
];

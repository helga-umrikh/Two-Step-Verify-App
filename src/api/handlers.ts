import { graphql, HttpResponse } from 'msw';

import { UserDB, VERIFICATION_CODE } from './mockData';
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
				// const verificationCode = randomInt(100000, 999999);

				challenges[challengeId] = {
					code: VERIFICATION_CODE,
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

	graphql.mutation('Verify2fa', ({ variables }) => {
		const { challengeId, code } = variables;

		if (challenges[challengeId]) {
			if (challenges[challengeId].code === code) {
				const accessToken = generateToken(32);
				const refreshToken = generateToken(64);

				return HttpResponse.json(
					{
						data: {
							access_token: accessToken,
							refresh_token: refreshToken,
							user: {
								id: randomInt(10, 100),
								email: challenges[challengeId].userEmail,
								name: 'Emma',
							},
						},
					},
					{
						headers: {
							'Set-Cookie': `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=900`,
						},
					}
				);
			}

			return HttpResponse.error();
		}

		return HttpResponse.error();
	}),
];

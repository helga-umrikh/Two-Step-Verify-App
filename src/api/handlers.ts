import { graphql, HttpResponse } from 'msw';

import { addMail } from '../redux/slices/MailSlice';
import { store } from '../redux/store';
import { UserDB } from './mockData';
import { generateToken, randomInt } from './utils';

const challenges: Record<string, { code: number; userEmail: string; retryAfter: string }> = {};

export const handlers = [
	graphql.mutation('Login', ({ variables }) => {
		const { email, password, challengeId } = variables;
		const validationEmailExistence = UserDB.find(
			(userData) => email === userData.email && userData
		);
		const dateNow = Date.now();

		//если данные для перезапроса не верны, или рано
		if (challengeId) {
			const timeTarget = new Date(challenges[challengeId].retryAfter).getTime();
			if (dateNow < timeTarget) {
				return HttpResponse.error();
			}
		}

		if (validationEmailExistence) {
			const isValidPassword = password === validationEmailExistence.password;

			if (isValidPassword) {
				const verificationCode = randomInt(100000, 999999);
				const retryAfter = new Date(dateNow + 45 * 1000).toISOString();
				const newChallengeId = crypto.randomUUID();

				challenges[challengeId || newChallengeId] = {
					code: verificationCode,
					userEmail: email,
					retryAfter,
				};

				//как бы отправка письма на почту
				store.dispatch(
					addMail({
						id: randomInt(1, 200),
						code: verificationCode,
						sender: 'google@gmail.com',
						receiver: email,
					})
				);

				return HttpResponse.json({
					data: {
						requires2FA: true,
						methods: ['totp', 'sms'],
						challengeId: challengeId || newChallengeId,
						retryAfter,
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

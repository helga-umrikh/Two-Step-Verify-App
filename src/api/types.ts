export enum ESTATUSCODE {
	NOT_FOUND = 404,
	INVALID_CREDENCIALS = 401,
}

export enum EAuthStage {
	UNAUTHORIZED = 'UNAUTHORIZED',
	AUTHORIZED = 'AUTHORIZED',
}

export type TUserCredencials = {
	email: string;
	password: string;
	challengeId?: string | null;
};

export type TVerification = {
	challengeId: string;
	code: number;
};

export type TPrimaryLog = {
	challengeId: string;
	methods: string[];
	requires2FA: boolean;
	retryAfter: string;
};

export type TUserData = {
	id: number;
	name: string;
	email: string;
};

export type TUserTokens = {
	access_token: string;
	refresh_token: string;
	user: TUserData;
};

export type TBaseQueryProps = {
	url: string;
	body: Partial<TUserCredencials> & Partial<TVerification>;
};

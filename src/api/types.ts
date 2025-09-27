export enum ESTATUSCODE {
	NOT_FOUND = 404,
	INVALID_CREDENCIALS = 401,
}

export type TUserCredencials = {
	email: string;
	password: string;
};

export type TVerification = {
	challengeId: string;
	code: string;
};

export type TUserData = {
	id: number;
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

import { MyContext } from '../types';
import { MiddlewareFn } from 'type-graphql';
import { verify, sign } from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../entity/User';
import { Response } from 'express';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
	try {
		const authorization = context.req.headers['authorization'];
		if (!authorization) {
			throw new Error('you must sign in');
		}
		const token = authorization.split(' ')[1];
		const payload = verify(token, config.accessToken);
		context.payload = payload as any;
	} catch (error) {
		throw new Error('no auth');
	}
	return next();
};

export const createRefreshToken = (user: User) => {
	return sign({ id: user.id }, config.refreshToken);
};

export const sendRefreshToken = (res: Response, token: string) => {
	res.cookie('jid', token, {
		httpOnly: true,
	});
};

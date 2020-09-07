import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../entity/User';
import {
	createRefreshToken,
	sendRefreshToken,
	createAccessToken,
} from '../middleware';
import { config } from '../config';

export const authRoutes: Router = Router();

authRoutes.post('/refresh_token', async (req, res) => {
	try {
		const token = req.cookies.jid;
		if (!token) {
			return res.send({ error: true, accessToken: '' });
		}

		let payload: any = null;
		payload = verify(token, config.refreshToken);
		const user = await User.findOne({ id: payload.userId });

		if (!user) {
			return res.send({ error: true, accessToken: '' });
		}

		if (user.tokenVersion !== payload.tokenVersion) {
			return res.send({ error: true, accessToken: '' });
		}

		sendRefreshToken(res, createRefreshToken(user));

		return res.send({ error: false, accessToken: createAccessToken(user) });
	} catch (err) {
		return res.send({ error: true, accessToken: '' });
	}
});

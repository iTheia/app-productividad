import { Resolver, Query, Ctx, Mutation, Arg } from 'type-graphql';
import { MyContext, LoginResponse, ErrorResponse } from '../types';
import { User } from '../entity/User';
import { config } from '../config';
import { verify } from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import { sendRefreshToken, createRefreshToken } from '../middleware';

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() context: MyContext) {
		try {
			const authorization = context.req.headers['authorization'];
			if (!authorization) {
				return null;
			}
			const token = authorization.split(' ')[1];
			const payload: any = verify(token, config.accessToken!);
			return User.findOne(payload.userId);
		} catch (err) {
			console.log(err);
			return null;
		}
	}
	@Mutation(() => Boolean)
	async logout(@Ctx() { res }: MyContext) {
		sendRefreshToken(res, '');
		return true;
	}
	@Mutation(() => LoginResponse)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() { res }: MyContext
	): Promise<LoginResponse | ErrorResponse> {
		try {
			const user = await User.findOne({ email });
			if (!user) {
				throw new Error('invalid login');
			}
			const validPassword = await compare(password, user.password);
			if (!validPassword) {
				throw new Error('invalid login');
			}
			const token = createRefreshToken(user);
			sendRefreshToken(res, token);
			return {
				accessToken: token,
				error: false,
			};
		} catch (e) {
			if (e instanceof Error) {
				return {
					error: true,
					message: e.message,
				};
			}
			return {
				error: true,
				message: e,
			};
		}
	}
	@Mutation(() => Boolean)
	async register(
		@Arg('email', () => String) email: string,
		@Arg('userName', () => String) userName: string,
		@Arg('password', () => String) password: string,
		@Arg('name', () => String) name: string
	) {
		try {
			const hashedPassword = await hash(password, 12);
			await User.insert({
				email,
				userName,
				name,
				password: hashedPassword,
			});
			return true;
		} catch (error) {
			return false;
		}
	}
}

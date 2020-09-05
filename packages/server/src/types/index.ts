import { Request, Response } from 'express';
import { ObjectType, Field } from 'type-graphql';

export interface MyContext {
	req: Request;
	res: Response;
	payload?: { id: string };
}

@ObjectType()
class IResponse {
	@Field()
	error: boolean;
}

@ObjectType()
export class ErrorResponse extends IResponse {
	@Field()
	message: string;
}

@ObjectType()
export class LoginResponse extends IResponse {
	@Field()
	accessToken: string;
}

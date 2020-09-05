import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolver/UserResolver';

export const startServer = async () => {
	try {
		const app = express();
		const server = createServer(app);
		app.use(
			cors({
				credentials: true,
				origin: '*',
			})
		);
		app.use(cookieParser());
		await createConnection();
		const apolloServer = new ApolloServer({
			schema: await buildSchema({
				resolvers: [UserResolver],
			}),
			context: ({ req, res }) => ({ req, res }),
		});
		apolloServer.applyMiddleware({ app, cors: false });
		console.log(config);
		server.listen(config.port);
	} catch (error) {
		console.log(error);
	}
};

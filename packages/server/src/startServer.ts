import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { router } from './router';
import { UserResolver } from './resolver/UserResolver';
import { LabelResolver } from './resolver/LabelResolver';
import { NoteResolver } from './resolver/NoteResolver';

export const startServer = async () => {
	try {
		const app = express();
		const server = createServer(app);
		app.use(
			cors({
				credentials: true,
				origin: 'http://localhost:3000',
			})
		);
		app.use(cookieParser());
		await createConnection();
		app.use('/', router);
		const apolloServer = new ApolloServer({
			schema: await buildSchema({
				resolvers: [UserResolver, LabelResolver, NoteResolver],
			}),
			context: ({ req, res }) => ({ req, res }),
		});
		apolloServer.applyMiddleware({ app, cors: false });
		server.listen(config.port);
	} catch (error) {
		console.log(error);
	}
};

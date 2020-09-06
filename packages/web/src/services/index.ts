import { ApolloClient, InMemoryCache } from '@apollo/client';
import { url } from './variables';

export const apolloClient = new ApolloClient({
	uri: `${url}/graphql`,
	credentials: 'include',
	cache: new InMemoryCache(),
});

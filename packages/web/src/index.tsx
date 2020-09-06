import React from 'react';
import ReactDOM from 'react-dom';
import { apolloClient } from './services';
import { ApolloProvider } from '@apollo/react-hooks';
import { Providers } from './context';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={apolloClient}>
			<Providers />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

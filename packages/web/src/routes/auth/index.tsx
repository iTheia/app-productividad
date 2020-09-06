import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginPage } from '../../views/auth/Login';
import { RegisterPage } from '../../views/auth/Register';

export const AuthRouter: React.FC = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/login" component={LoginPage} />
			<Route path="/register" component={RegisterPage} />
		</Switch>
	</BrowserRouter>
);

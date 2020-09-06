import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProfilePage } from '../../views/user/Profile';
import { DashboardPage } from '../../views/user/Dashboard';

interface Props {}

export const UserRoutes: React.FC<Props> = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={DashboardPage} />
			<Route path="/profile" component={ProfilePage} />
		</Switch>
	</BrowserRouter>
);

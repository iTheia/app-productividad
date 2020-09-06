import React, { useEffect } from 'react';
import { AuthRouter } from './auth';
import { UserRoutes } from './user';
import { FullSizeLoaderComponent } from '../components/FullSizeLoader';
import { useMyProfileQuery } from '../generated';

interface Props {}

export const Routes: React.FC<Props> = () => {
	const { data, loading } = useMyProfileQuery();

	useEffect(() => {
		console.log(data, loading);
	}, [data?.me]);

	if (loading) return <FullSizeLoaderComponent />;
	if (data?.me === null) return <AuthRouter />;
	else return <UserRoutes />;
};

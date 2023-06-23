// Packages
import { useContext, useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import decodeJWT from 'jwt-decode';

// Utils
import axios from '../../utils/axios';

// Context
import { AuthContext } from '../../context/AuthContext';

// Components
import { Progress } from '../ui/progress';

// Assets
import LSP from '../../assets/logo/components/LSP';

export const Authentication = () => {
	const { auth } = useContext(AuthContext);
	const location = useLocation();

	return auth?.access_token ? (
		<Outlet />
	) : (
		<Navigate
			to="/masuk"
			state={{ from: location }}
			replace
		/>
	);
};

export const Authorization = ({ allowedRoles }) => {
	const { auth } = useContext(AuthContext);
	const location = useLocation();

	return allowedRoles.includes(auth?.role) ? (
		<Outlet />
	) : (
		<Navigate
			to="/unauthorized"
			state={{ from: location }}
			replace
		/>
	);
};

export const RefreshAuthentication = () => {
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const { auth, setAuth } = useContext(AuthContext);

	useQuery({
		queryKey: ['refresh'],
		queryFn: () => {
			return axios.get('/auth/token/access/refresh');
		},
		onSuccess: (data) => {
			const verify = () => {
				const { access_token } = data.data.data;
				const { id, email, role } = decodeJWT(access_token);
				setAuth({ id, email, role, access_token });
			};
			!auth?.access_token && verify();
		},
		onError: (error) => {
			console.log(error);
		},
		onSettled: () => {
			setTimeout(() => setIsLoading(false), 1000);
		},
		retry: false,
	});

	useEffect(() => {
		const timer = setTimeout(() => setProgress(100), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="w-[100vw flex h-[100vh] items-center justify-center">
					<div className="flex flex-col gap-8">
						<LSP className="h-20" />
						<Progress
							value={progress}
							className="w-96 bg-secondary-100"
						/>
					</div>
				</div>
			) : (
				<Outlet />
			)}
		</>
	);
};

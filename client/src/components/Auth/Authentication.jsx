import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

// { allowedRoles } tambahkan di parameter
export const Authentication = () => {
	const { auth } = useContext(AuthContext);
	const location = useLocation();

	return auth?.accessToken ? (
		<Outlet />
	) : (
		<Navigate
			to="/masuk"
			state={{ from: location }}
			replace
		/>
	);

	// return auth?.role === allowedRoles ? (
	// 	<Outlet />
	// ) : auth?.accessToken ? (
	// 	<Navigate
	// 		to="/unauthorized"
	// 		state={{ from: location }}
	// 		replace
	// 	/>
	// ) : (
	// 	<Navigate
	// 		to="/masuk"
	// 		state={{ from: location }}
	// 		replace
	// 	/>
	// );
};

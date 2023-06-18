import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Dashboard = () => {
	const { auth, setAuth } = useContext(AuthContext);

	// console.log(typeof auth.role);
	return (
		<>
			<div>Halaman Dashboard</div>
		</>
	);
};

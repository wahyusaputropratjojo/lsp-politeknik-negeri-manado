import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
	return (
		<>
			<div className="flex h-[100vh] justify-center p-8">
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
};

// Packages
import { useState, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

// Context
import { AuthContext } from '../../../context/AuthContext';

// Utils
import { cn } from '../../../utils/cn';
import axios from '../../../utils/axios';

// Components
// import { Button } from '../Button';
import { Button } from '../button';
import { Navigation } from './Navigation';

// Assets
import LSP from '../../../assets/logo/components/LSP';
import PoliteknikNegeriManado from '../../../assets/logo/components/PoliteknikNegeriManado';
import Home01 from '../../../assets/icons/untitled-ui-icons/line/components/Home01';
import UserSquare from '../../../assets/icons/untitled-ui-icons/line/components/UserSquare';
import DotsVertical from '../../../assets/icons/untitled-ui-icons/line/components/DotsVertical';
import User01 from '../../../assets/icons/untitled-ui-icons/line/components/User01';
import LogOut02 from '../../../assets/icons/untitled-ui-icons/line/components/LogOut02';
import ChevronRight from '../../../assets/icons/untitled-ui-icons/line/components/ChevronRight';
import ChevronLeft from '../../../assets/icons/untitled-ui-icons/line/components/ChevronLeft';

export const Sidebar = () => {
	const [nama, setNama] = useState('');
	const [role, setRole] = useState('');
	const { auth, setAuth } = useContext(AuthContext);
	const [visible, setVisible] = useState(false);

	useQuery({
		queryKey: ['user'],
		queryFn: () => {
			return axios.get(`/user/${auth.id}`);
		},
		onSuccess: (data) => {
			const { role } = data.data.data;
			const { nama } = data.data.data.profil;

			setNama(nama);
			setRole(role);
		},
	});

	const { mutate } = useMutation({
		mutationFn: () => {
			axios.delete('/auth/logout');
		},
	});

	const logOut = async () => {
		mutate();
		setAuth({});
	};

	const profileMenu = (e) => {
		setVisible(!visible);
	};

	const [isMinimize, setIsMinimize] = useState(false);
	const [isHide, setIsHide] = useState(false);

	const handleMinimize = (e) => {
		setIsMinimize(!isMinimize);
		// console.log(isMinimize);
		setIsHide(!isHide);
	};

	return (
		<>
			<div className="relative flex h-full w-min">
				<div
					className={cn(
						'flex h-full w-72 flex-col justify-between gap-11 rounded-2xl bg-white px-8 py-8',
						{
							'w-24 px-6 py-8': isMinimize,
						},
					)}>
					<div
						className={cn('flex', {
							'justify-center': isMinimize,
						})}>
						{!isMinimize && <LSP className="h-10" />}
						{isMinimize && <PoliteknikNegeriManado className="h-10" />}
					</div>
					<nav className="flex h-full max-h-full flex-col gap-1">
						<Navigation
							label="Dashboard"
							icon={Home01}
							hide={isHide}
							navigateTo="/"
						/>
						<Navigation
							label="Kontak"
							icon={UserSquare}
							hide={isHide}
							navigateTo="kontak"
						/>
					</nav>
					<div className="flex flex-col gap-4">
						<hr className="rounded-full border-2 text-secondary-50" />
						<div className="flex items-center justify-between gap-2">
							<div className="flex aspect-square h-12 items-center justify-center rounded-lg bg-secondary-50">
								<User01 className="text-xl" />
							</div>
							{!isMinimize && (
								<div className="flex w-full items-center justify-between gap-2">
									<div>
										<p className="w-36 truncate font-anek-latin text-lg font-semibold text-secondary-500">
											{nama}
										</p>
										<p className="font-aileron text-xs font-normal text-secondary-500">
											{role}
										</p>
									</div>
									<div>
										<button onClick={profileMenu}>
											<DotsVertical className="text-lg" />
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="absolute -right-2 top-0 flex h-8 w-8 translate-x-full rounded-xl bg-white">
					<button className="flex h-full w-full items-center justify-center">
						{!isMinimize && (
							<ChevronLeft
								onClick={handleMinimize}
								className="text-xl"
							/>
						)}
						{isMinimize && (
							<ChevronRight
								onClick={handleMinimize}
								className="text-xl"
							/>
						)}
					</button>
				</div>
				{visible && (
					<div className="absolute -right-4 bottom-0 flex h-min translate-x-full flex-col gap-2 rounded-2xl bg-white px-4 py-4">
						<Button
							size="small"
							variant="error"
							className="flex gap-2"
							onClick={logOut}>
							<LogOut02 />
							Keluar
						</Button>
					</div>
				)}
			</div>
		</>
	);
};

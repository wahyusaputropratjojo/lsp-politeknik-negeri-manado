import { Navigation } from './Navigation';

import { LSP } from '../../assets/logo/components';

import {
	Home01,
	UserSquare,
	DotsVertical,
	User01,
} from '../../assets/icons/untitled-ui-icons/line/components';

export const Sidebar = (props) => {
	return (
		<>
			<div className="flex h-full flex-col justify-between gap-11 rounded-2xl bg-shades-white px-8 py-8">
				<div>
					<LSP className="h-10" />
				</div>
				<nav className="flex h-full max-h-full flex-col gap-1">
					<Navigation
						label="Dashboard"
						icon={Home01}
						navigateTo="/"
					/>
					<Navigation
						label="Kontak"
						icon={UserSquare}
						navigateTo="kontak"
					/>
				</nav>
				<div className="flex flex-col gap-4">
					<hr className="rounded-full border-2 text-secondary-50" />
					<div className="flex w-full items-center gap-2">
						<div className="flex aspect-square h-12 items-center justify-center rounded-lg bg-secondary-50">
							<User01 className="text-xl" />
						</div>
						<div className="flex w-full items-center justify-between">
							<div>
								<p className="font font-anek-latin text-lg font-semibold text-secondary-500">
									Nama
								</p>
								<p className="font font-aileron text-xs font-normal text-secondary-500">
									Role
								</p>
							</div>
							<div>
								<DotsVertical className="text-lg" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

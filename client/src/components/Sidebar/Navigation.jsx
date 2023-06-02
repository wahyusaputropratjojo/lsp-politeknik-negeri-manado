import { NavLink } from 'react-router-dom';

export const Navigation = (props) => {
	return (
		<>
			<NavLink
				to={props.navigateTo}
				className="flex cursor-pointer items-center gap-4 p-3.5 font-anek-latin text-base font-semibold leading-[1.1rem] text-secondary-500 hover:rounded-lg hover:bg-secondary-50">
				<span>
					<props.icon className="text-lg text-secondary-500" />
				</span>
				{props.label}
			</NavLink>
		</>
	);
};

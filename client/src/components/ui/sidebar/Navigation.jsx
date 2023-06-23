import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/cn';

export const Navigation = ({ className, to, isMinimized, ...props }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive, isPending }) =>
				cn(
					'flex h-12 items-center gap-4 rounded-lg px-4 font-aileron text-base font-semibold text-secondary-500 transition-colors hover:bg-secondary-50',
					{
						'bg-secondary-50 hover:bg-secondary-100': isActive,
					},
					{
						'': isPending,
					},
					{
						'justify-center px-0': isMinimized,
					},
				)
			}
			{...props}
		/>
	);
};

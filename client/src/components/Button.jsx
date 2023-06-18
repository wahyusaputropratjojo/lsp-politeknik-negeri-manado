import { cn } from '../utils/cn';

export const Button = (props) => {
	let isFillContainer = false;

	if (props.fillcontainer === 'true') isFillContainer = true;

	return (
		<>
			<button
				{...props}
				className={cn(
					'flex items-center justify-center gap-1 rounded-lg bg-primary-500 px-8 py-4 font-anek-latin text-2xl font-semibold text-secondary-500 transition-colors ease-in-out hover:bg-primary-600 focus:bg-primary-700',
					{
						'w-full': isFillContainer,
					},
				)}>
				{props.label}
				{props.icon && (
					<div className={cn('text-xl text-secondary-500')}>{props.icon}</div>
				)}
			</button>
		</>
	);
};

import { cn } from '../../../utils/cn';

export const Skeleton = ({ className, ...props }) => {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-muted', className)}
			{...props}
		/>
	);
};

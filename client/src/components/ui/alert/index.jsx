import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const alertVariants = cva(
	'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
	{
		variants: {
			variant: {
				primary:
					'bg-secondary-50 text-secondary-300 hover:text-secondary-500 [&>svg]:text-secondary-300 hover:[&>svg]:text-secondary-500',
				error:
					'bg-error-50 text-error-500 hover:text-error-600 [&>svg]:text-error-500 hover:[&>svg]:text-error-600',
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	},
);

export const Alert = React.forwardRef(
	({ className, variant, ...props }, ref) => (
		<div
			ref={ref}
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	),
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
	<h5
		ref={ref}
		className={cn(
			'mb-1 font-aileron font-semibold leading-none tracking-tight',
			className,
		)}
		{...props}
	/>
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('font-aileron text-sm [&_p]:leading-relaxed', className)}
			{...props}
		/>
	),
);
AlertDescription.displayName = 'AlertDescription';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

export const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-lg font-semibold font-anek-latin transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background w-full',
	{
		variants: {
			variant: {
				primary:
					'bg-primary-500 text-secondary-500 hover:bg-primary-600 focus:bg-primary-700 border-4 border-primary-500 hover:border-primary-600 focus:border-primary-700',
				secondary:
					'bg-transparent border-4 border-secondary-500 text-secondary-foreground hover:bg-secondary-500 hover:text-white focus:bg-secondary-700 focus:text-white',
				error:
					'bg-error-50 text-error-500 hover:bg-error-100 focus:bg-error-200',
				ghost:
					'bg-primary-500 hover:bg-primary-500 foucs:bg-secondary-500 active:bg-secondary-700',
			},
			size: {
				small: 'px-4 py-2 text-lg',
				medium: 'px-6 py-3 text-xl',
				large: 'px-8 py-4 text-2xl',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'medium',
		},
	},
);

export const Button = React.forwardRef(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg border-2 font-anek-latin font-semibold transition-colors disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "border-primary-500 bg-primary-500 text-secondary-500 hover:border-primary-600 hover:bg-primary-600 focus:border-primary-600 focus:bg-primary-600 focus:outline-none active:border-primary-700 active:bg-primary-700 disabled:border-primary-200 disabled:bg-primary-200 disabled:text-secondary-300",
        secondary:
          "border-secondary-500 bg-secondary-500 text-white hover:bg-secondary-600 focus:border-secondary-600 focus:bg-secondary-600 focus:outline-none active:bg-secondary-700 disabled:border-secondary-200 disabled:bg-secondary-200 disabled:text-secondary-300",
        error:
          "border-error-50 bg-error-50 text-error-500 hover:border-error-100 hover:bg-error-100 focus:border-error-100 focus:bg-error-100 focus:outline-none active:border-error-200 active:bg-error-200 disabled:border-error-200 disabled:bg-error-200 disabled:text-error-300",
        outline:
          "border-secondary-500 text-secondary-500 hover:bg-secondary-600 hover:text-white focus:border-secondary-600 focus:bg-secondary-600 focus:text-white focus:outline-none active:bg-secondary-700 active:text-white disabled:border-secondary-200 disabled:bg-secondary-200 disabled:text-secondary-300",
      },
      size: {
        xs: "h-10 px-4 text-sm",
        sm: "h-12 px-4 text-base",
        md: "h-14 px-6 text-lg",
        lg: "h-16 px-8 text-xl",
        xl: "h-20 px-12 text-2xl",
      },
      content: {
        icon: "h-max w-max p-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export const Button = React.forwardRef(
  ({ className, variant, size, content, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            content,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

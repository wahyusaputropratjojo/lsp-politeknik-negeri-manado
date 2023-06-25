import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";

export const inputVariants = cva(
  "flex w-full rounded-lg border-2 bg-transparent font-aileron text-sm text-secondary-300 hover:text-secondary-400 focus:text-secondary-500 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary-100 disabled:text-secondary-300 disabled:border-secondary-100",
  {
    variants: {
      variant: {
        primary:
          "border-secondary-300 hover:border-secondary-400 focus:border-secondary-500",
        error: "border-error-500 focus:border-error-500",
        success: "border-success-500 focus:border-success-500",
      },
      size: {
        xs: "h-8 text-sm px-2",
        s: "h-10 text-sm px-2",
        m: "h-12 text-sm px-4",
        l: "h-14 text-sm px-4",
        xl: "h-16 text-base px-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "m",
    },
  }
);

export const Input = React.forwardRef(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

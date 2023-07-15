import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";
import Upload04 from "../../../assets/icons/untitled-ui-icons/line/components/Upload04";

export const inputVariants = cva(
  "inline-flex rounded-lg border-2 bg-transparent font-aileron transition-colors hover:text-secondary-400 focus:text-secondary-500 focus:outline-none disabled:cursor-not-allowed disabled:border-secondary-100 disabled:bg-secondary-100 disabled:text-secondary-300",
  {
    variants: {
      variant: {
        primary:
          "border-secondary-300 placeholder:text-secondary-100 hover:border-secondary-400  focus:border-secondary-500 active:border-secondary-400",
        error:
          "border-error-500 placeholder:text-secondary-100 focus:border-error-600 active:border-error-500",
      },
      size: {
        xs: "h-10 px-2 text-sm",
        sm: "h-12 px-2 text-sm",
        md: "h-14 px-4 text-sm",
        lg: "h-16 px-4 text-base",
        xl: "h-20 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
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

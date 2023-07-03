import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";

export const textareaVariants = cva(
  "inline-flex min-h-[6rem] items-center justify-center rounded-lg border-2 bg-transparent p-4 font-aileron text-sm text-secondary-300 file:border-0 file:bg-transparent file:text-sm hover:text-secondary-400 focus:text-secondary-500 focus:outline-none disabled:cursor-not-allowed disabled:border-secondary-100 disabled:bg-secondary-100 disabled:text-secondary-300",
  {
    variants: {
      variant: {
        primary:
          "border-secondary-300 hover:border-secondary-400 focus:border-secondary-500",
        error: "border-error-500 focus:border-error-500",
        success: "border-success-500 focus:border-success-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export const Textarea = React.forwardRef(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex  w-full rounded-md border border-secondary-300 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50

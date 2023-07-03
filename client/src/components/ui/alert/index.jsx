import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";

const alertVariants = cva(
  "relative flex w-full items-center gap-2 rounded-lg p-4 transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-secondary-50 text-secondary-300 hover:text-secondary-500",
        error: "bg-error-50 text-error-500 hover:text-error-600",
        success: "bg-success-50 text-success-500 hover:text-success-600",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export const Alert = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = "Alert";

export const AlertDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-aileron text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
);
AlertDescription.displayName = "AlertDescription";

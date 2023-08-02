import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import X from "../../../assets/icons/untitled-ui-icons/line/components/X";

import { cn } from "../../../utils/cn";

export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
      {...props}
    />
  ),
);
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 font-aileron shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "bg-white text-secondary-500",
        error: "error group bg-error-50 text-error-500",
        success: "success group bg-success-50 text-success-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const Toast = React.forwardRef(
  ({ className, variant, ...props }, ref) => {
    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Toast.displayName = ToastPrimitives.Root.displayName;

export const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "focus:ring-ring inline-flex h-8 shrink-0 items-center justify-center rounded-lg border-2 border-primary-500 bg-primary-500 px-3 font-aileron text-sm text-secondary-500 transition-colors hover:bg-primary-600 hover:text-secondary-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50 group-[.error]:border-error-500 group-[.success]:border-success-500 group-[.error]:bg-error-50 group-[.success]:bg-success-50 group-[.error]:text-error-600 group-[.success]:text-success-600 group-[.error]:hover:bg-error-500 group-[.success]:hover:bg-success-500 group-[.error]:hover:text-error-50 group-[.success]:hover:text-success-50",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

export const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-lg p-1 text-secondary-500 opacity-0 transition-all hover:bg-primary-500 hover:text-secondary-600 focus:opacity-100 focus:outline-none group-hover:opacity-100 group-[.error]:text-error-500 group-[.success]:text-success-600 group-[.error]:hover:bg-error-100 group-[.success]:hover:bg-success-100 group-[.error]:hover:text-error-600 group-[.success]:hover:text-success-700",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

export const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-bold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

export const ToastDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm", className)}
      {...props}
    />
  ),
);
ToastDescription.displayName = ToastPrimitives.Description.displayName;

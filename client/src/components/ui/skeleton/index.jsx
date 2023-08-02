import { cn } from "../../../utils/cn";

export const Skeleton = ({ className, ...props }) => {
  return <div className={cn("animate-pulse rounded-lg bg-secondary-100", className)} {...props} />;
};

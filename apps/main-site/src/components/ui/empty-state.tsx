import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main heading text */
  title: string;
  /** Descriptive text explaining the empty state */
  description?: string;
  /** Optional action button/link */
  action?: React.ReactNode;
  /** Size variant */
  size?: "sm" | "default" | "lg";
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, action, size = "default", ...props }, ref) => {
    const sizeStyles = {
      sm: {
        container: "py-8 px-4",
        title: "text-sm font-medium",
        description: "text-xs",
      },
      default: {
        container: "py-12 px-6",
        title: "text-base font-medium",
        description: "text-sm",
      },
      lg: {
        container: "py-16 px-8",
        title: "text-lg font-medium",
        description: "text-base",
      },
    };

    const styles = sizeStyles[size];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center",
          styles.container,
          className
        )}
        {...props}
      >
        <h3 className={cn(styles.title, "text-foreground mb-2")}>
          {title}
        </h3>
        {description && (
          <p className={cn(styles.description, "text-muted-foreground max-w-md mb-4")}>
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export { EmptyState };

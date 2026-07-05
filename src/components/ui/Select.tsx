import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`rounded-xl border border-border bg-background px-4 py-2 text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring ${
            error ? "border-danger" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-sm text-danger">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
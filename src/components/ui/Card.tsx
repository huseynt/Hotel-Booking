import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-colors duration-300 ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`border-b border-border px-6 py-4 transition-colors duration-300 ${className}`}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={`px-6 py-4 transition-colors duration-300 ${className}`} {...props} />
    );
  }
);

CardContent.displayName = "CardContent";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

    const variantStyles = {
      primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:-translate-y-0.5",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 hover:-translate-y-0.5",
      outline:
        "border border-border bg-transparent text-foreground hover:bg-muted hover:-translate-y-0.5",
    };

    const sizeStyles = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

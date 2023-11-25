import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('button', {
  variants: {
    intent: {
      normal: [],
      elevated: [],
      outlined: [],
    },
    variant: {
      primary: [],
      secondary: [],
      accent: [],
    },
  },
  defaultVariants: {
    variant: 'primary',
    intent: 'normal',
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leadingIcon?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, intent, variant, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, intent, className })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export { Button, buttonVariants };

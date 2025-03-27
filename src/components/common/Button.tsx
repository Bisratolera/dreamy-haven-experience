
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className,
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'right',
}) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center transition-all duration-300 font-medium',
    variant === 'primary' && 'bg-hotel-gold text-white hover:bg-hotel-charcoal shadow-button hover:shadow-none',
    variant === 'outline' && 'border border-hotel-gold text-hotel-gold hover:bg-hotel-gold hover:text-white shadow-button hover:shadow-none',
    variant === 'text' && 'text-hotel-charcoal hover:text-hotel-gold',
    size === 'sm' && 'text-sm px-4 py-2',
    size === 'md' && 'px-6 py-3',
    size === 'lg' && 'text-lg px-8 py-4',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;

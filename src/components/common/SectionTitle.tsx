
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  subtitleClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  description,
  align = 'center',
  className,
  subtitleClassName,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12',
        align === 'center' && 'mx-auto text-center',
        align === 'right' && 'ml-auto text-right',
        className
      )}
    >
      {subtitle && (
        <div 
          className={cn(
            'section-subtitle',
            subtitleClassName
          )}
        >
          {subtitle}
        </div>
      )}
      <h2 
        className={cn(
          'section-title',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p 
          className={cn(
            'text-hotel-stone max-w-2xl',
            align === 'center' && 'mx-auto',
            align === 'right' && 'ml-auto',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;

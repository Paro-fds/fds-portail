import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'standard' | 'flat' | 'accent';
  className?: string;
  accentColor?: string; // e.g. "border-primary"
}

export const Card: React.FC<CardProps> = ({ children, variant = 'standard', className = '', accentColor = 'border-primary' }) => {
  const variants = {
    standard: "bg-white rounded-xl border border-outline-variant/15 hover:shadow-[0_8px_24px_rgba(17,28,45,0.06)] transition-all duration-300",
    flat: "p-6 bg-surface-container-low rounded-xl",
    accent: `p-6 bg-surface-container-low rounded-xl border-l-4 ${accentColor}`
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

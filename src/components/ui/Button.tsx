import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  icon?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "font-headline font-bold rounded-md transition-all flex items-center justify-center gap-2 group min-h-[44px]";
  const widthClass = fullWidth ? "w-full" : "w-max";
  
  const variants = {
    primary: "px-6 py-4 bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98] shadow-sm",
    secondary: "px-6 py-3 bg-surface-container-high text-primary hover:bg-surface-container",
    ghost: "px-6 py-2.5 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20",
    outline: "px-4 py-3 bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 uppercase tracking-widest text-xs"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
      {icon && (
        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
          {icon}
        </span>
      )}
    </button>
  );
};

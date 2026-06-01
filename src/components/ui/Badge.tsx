import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'academic' | 'urgent' | 'success' | 'neutral';
  icon?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', icon, className = '' }) => {
  const variants = {
    academic: "bg-primary-fixed text-primary",
    urgent: "bg-error-container/30 text-error tracking-tighter",
    success: "bg-tertiary text-white", // Modifié selon FDS_UI.md : tertiary text-white
    neutral: "bg-surface text-secondary"
  };

  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1 w-max ${variants[variant]} ${className}`}>
      {icon && <span className="material-symbols-outlined text-[12px]">{icon}</span>}
      {children}
    </span>
  );
};

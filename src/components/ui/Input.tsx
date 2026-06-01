import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, error, className = '', ...props }) => {
  const isError = Boolean(error);

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="font-label text-xs font-semibold uppercase tracking-wider text-secondary">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isError ? 'text-error' : 'text-secondary group-focus-within:text-primary'}`}>
            <span className="material-symbols-outlined text-lg">{icon}</span>
          </span>
        )}
        <input
          className={`w-full h-12 pr-4 bg-surface-container-low border rounded-md outline-none transition-all font-body text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary ${
            icon ? 'pl-12' : 'pl-4'
          } ${
            isError 
              ? 'border-error focus:border-error bg-error/5 text-on-surface' 
              : 'border-outline-variant/30 focus:border-primary'
          }`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-semibold text-error mt-1">{error}</p>
      )}
    </div>
  );
};

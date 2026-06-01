import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
      <div>
        <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">{title}</h1>
        {subtitle && (
          <p className="font-body text-on-surface-variant text-lg leading-relaxed">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

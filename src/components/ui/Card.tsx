'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({ children, className, padding = 'md', hover = false }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div
      className={cn(
        'bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)]',
        'shadow-[var(--shadow-sm)]',
        hover && 'transition-shadow duration-200 hover:shadow-[var(--shadow-md)]',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn('', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
          <p className="text-2xl font-semibold text-[var(--color-text-primary)] mt-1">{value}</p>
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-[var(--color-bg-tertiary)]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

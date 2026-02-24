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
        'bg-white rounded-xl border border-[#E2E8F0]',
        'shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]',
        hover && 'transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)]',
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
          <p className="text-sm text-[#64748B]">{label}</p>
          <p className="text-2xl font-semibold text-[#0F172A] mt-1">{value}</p>
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-[#F1F5F9]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

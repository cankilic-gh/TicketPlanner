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
  trend?: number;
  trendLabel?: string;
  icon?: ReactNode;
  accentColor?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  trend,
  trendLabel,
  icon,
  accentColor = '#4F46E5',
  className,
}: StatCardProps) {
  const isPositiveTrend = trend && trend > 0;
  const isNegativeTrend = trend && trend < 0;

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div
        className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
        style={{ backgroundColor: accentColor }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#475569] font-medium">{label}</p>
          <p className="text-2xl font-semibold text-[#0F172A] mt-1">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isPositiveTrend && (
                <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {isNegativeTrend && (
                <svg className="w-4 h-4 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <span
                className={cn(
                  'text-xs font-medium',
                  isPositiveTrend && 'text-[#10B981]',
                  isNegativeTrend && 'text-[#EF4444]',
                  !trend && 'text-[#6B7280]'
                )}
              >
                {Math.abs(trend)}%{trendLabel && ` ${trendLabel}`}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

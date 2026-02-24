'use client';

import { cn } from '@/lib/utils';
import { STATUS_CONFIG, PRIORITY_CONFIG, type TicketStatus, type TicketPriority } from '@/types';

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
        className
      )}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
}

interface PriorityIndicatorProps {
  priority: TicketPriority;
  showLabel?: boolean;
  className?: string;
}

export function PriorityIndicator({ priority, showLabel = false, className }: PriorityIndicatorProps) {
  const config = PRIORITY_CONFIG[priority];

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        className={cn(
          'w-2 h-2 rounded-full',
          priority === 'critical' && 'animate-pulse-glow'
        )}
        style={{ backgroundColor: config.color }}
      />
      {showLabel && (
        <span className="text-xs font-medium" style={{ color: config.color }}>
          {config.label}
        </span>
      )}
    </span>
  );
}

interface LabelBadgeProps {
  label: string;
  color?: string;
  onRemove?: () => void;
  className?: string;
}

export function LabelBadge({ label, color = '#64748B', onRemove, className }: LabelBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
        className
      )}
      style={{
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-black/10 rounded p-0.5 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

interface CountBadgeProps {
  count: number;
  variant?: 'default' | 'danger' | 'warning' | 'success';
  className?: string;
}

export function CountBadge({ count, variant = 'default', className }: CountBadgeProps) {
  const variants = {
    default: 'bg-[#E2E8F0] text-[#475569]',
    danger: 'bg-[#FEE2E2] text-[#DC2626]',
    warning: 'bg-[#FEF3C7] text-[#D97706]',
    success: 'bg-[#D1FAE5] text-[#059669]',
  };

  if (count === 0) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}

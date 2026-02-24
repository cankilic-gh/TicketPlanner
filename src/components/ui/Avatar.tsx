'use client';

import { cn } from '@/lib/utils';
import type { User, WorkloadLevel } from '@/types';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showOnline?: boolean;
  isOnline?: boolean;
  showWorkload?: boolean;
  workloadLevel?: WorkloadLevel;
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

const onlineDotSizes = {
  xs: 'w-1.5 h-1.5 -right-0.5 -bottom-0.5',
  sm: 'w-2 h-2 right-0 bottom-0',
  md: 'w-2.5 h-2.5 right-0 bottom-0',
  lg: 'w-3 h-3 right-0.5 bottom-0.5',
};

const workloadColors: Record<WorkloadLevel, string> = {
  light: '#10B981',
  moderate: '#F59E0B',
  heavy: '#F97316',
  overloaded: '#EF4444',
};

export function Avatar({
  src,
  name,
  size = 'md',
  showOnline = false,
  isOnline = false,
  showWorkload = false,
  workloadLevel = 'moderate',
  className,
}: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn('relative inline-flex flex-shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            'rounded-full object-cover bg-[#F1F5F9]',
            sizeClasses[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full flex items-center justify-center bg-[#4F46E5] text-white font-medium',
            sizeClasses[size]
          )}
        >
          {initials}
        </div>
      )}

      {showOnline && (
        <span
          className={cn(
            'absolute rounded-full border-2 border-white',
            onlineDotSizes[size],
            isOnline ? 'bg-[#10B981] animate-presence' : 'bg-[#9CA3AF]'
          )}
        />
      )}

      {showWorkload && (
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full"
          style={{
            width: size === 'xs' ? '16px' : size === 'sm' ? '24px' : '32px',
            backgroundColor: workloadColors[workloadLevel],
          }}
        />
      )}
    </div>
  );
}

interface AvatarGroupProps {
  users: Pick<User, 'id' | 'name' | 'avatar'>[];
  max?: number;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export function AvatarGroup({ users, max = 3, size = 'sm', className }: AvatarGroupProps) {
  const visibleUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleUsers.map((user) => (
        <Avatar
          key={user.id}
          src={user.avatar}
          name={user.name}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'rounded-full flex items-center justify-center bg-[#E2E8F0] text-[#475569] font-medium ring-2 ring-white',
            sizeClasses[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

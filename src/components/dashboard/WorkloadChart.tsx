'use client';

import { cn, getInitials, getAvatarColor } from '@/lib/utils';
import { mockUsers } from '@/data/mockData';
import type { WorkloadLevel } from '@/types';

interface WorkloadChartProps {
  className?: string;
}

const workloadColors: Record<WorkloadLevel, string> = {
  light: '#10B981',
  moderate: '#F59E0B',
  heavy: '#F97316',
  overloaded: '#EF4444',
};

const workloadLabels: Record<WorkloadLevel, string> = {
  light: 'Light',
  moderate: 'Moderate',
  heavy: 'Heavy',
  overloaded: 'Overloaded',
};

export function WorkloadChart({ className }: WorkloadChartProps) {
  const developers = mockUsers.filter((u) => u.role === 'developer' || u.role === 'qa');
  const maxTickets = Math.max(...developers.map((d) => d.openTickets));

  return (
    <div className={cn('bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] overflow-hidden', className)}>
      <div className="px-5 py-4 border-b border-[var(--color-border)]">
        <h3 className="font-semibold text-[var(--color-text-primary)]">Workload Distribution</h3>
      </div>

      <div className="p-5 space-y-4">
        {developers.map((user) => {
          const barWidth = (user.openTickets / maxTickets) * 100;
          const color = workloadColors[user.workloadLevel];

          return (
            <div key={user.id} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                style={{ backgroundColor: getAvatarColor(user.name) }}
              >
                {getInitials(user.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">{user.name}</span>
                  <span className="text-xs font-medium" style={{ color }}>
                    {user.openTickets} tickets
                  </span>
                </div>
                <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-5 py-3 border-t border-[var(--color-border)] flex items-center gap-4">
        {(Object.keys(workloadColors) as WorkloadLevel[]).map((level) => (
          <div key={level} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: workloadColors[level] }}
            />
            <span className="text-xs text-[var(--color-text-muted)]">{workloadLabels[level]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

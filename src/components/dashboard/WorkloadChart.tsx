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
    <div className={cn('bg-white rounded-xl border border-[#E2E8F0] overflow-hidden', className)}>
      <div className="px-5 py-4 border-b border-[#E2E8F0]">
        <h3 className="font-semibold text-[#0F172A]">Workload Distribution</h3>
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
                  <span className="text-sm font-medium text-[#0F172A] truncate">{user.name}</span>
                  <span className="text-xs font-medium" style={{ color }}>
                    {user.openTickets} tickets
                  </span>
                </div>
                <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
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
      <div className="px-5 py-3 border-t border-[#E2E8F0] flex items-center gap-4">
        {(Object.keys(workloadColors) as WorkloadLevel[]).map((level) => (
          <div key={level} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: workloadColors[level] }}
            />
            <span className="text-xs text-[#64748B]">{workloadLabels[level]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

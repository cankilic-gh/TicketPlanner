'use client';

import { cn } from '@/lib/utils';

interface HealthScoreProps {
  score: number;
  message: string;
  className?: string;
}

export function HealthScore({ score, message, className }: HealthScoreProps) {
  const getColor = () => {
    if (score >= 80) return '#10B981';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getLabel = () => {
    if (score >= 80) return 'Healthy';
    if (score >= 50) return 'Needs Attention';
    return 'Critical';
  };

  const color = getColor();
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>{score}</span>
          <span className="text-xs text-[#64748B]">{getLabel()}</span>
        </div>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-[#0F172A]">Project Health</h4>
        <p className="text-xs text-[#64748B] mt-1">{message}</p>
      </div>
    </div>
  );
}

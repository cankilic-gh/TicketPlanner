'use client';

import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui';
import { mockActivities } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import {
  ArrowRight,
  MessageSquare,
  Plus,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

interface ActivityFeedProps {
  className?: string;
}

const activityIcons = {
  'status-change': <ArrowRight size={14} className="text-[#6366F1]" />,
  'priority-change': <AlertTriangle size={14} className="text-[#F59E0B]" />,
  'assignment': <ArrowRight size={14} className="text-[#3B82F6]" />,
  'comment': <MessageSquare size={14} className="text-[#10B981]" />,
  'created': <Plus size={14} className="text-[#8B5CF6]" />,
  'resolved': <CheckCircle2 size={14} className="text-[#10B981]" />,
  'ai-action': <Sparkles size={14} className="text-[#EC4899]" />,
};

export function ActivityFeed({ className }: ActivityFeedProps) {
  return (
    <div className={cn('bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] overflow-hidden', className)}>
      <div className="px-5 py-4 border-b border-[var(--color-border)]">
        <h3 className="font-semibold text-[var(--color-text-primary)]">Team Activity</h3>
      </div>

      <div className="divide-y divide-[var(--color-border)] max-h-[400px] overflow-y-auto">
        {mockActivities.map((activity) => (
          <Link
            key={activity.id}
            href={`/tickets/${activity.ticketId}`}
            className="flex items-start gap-3 px-5 py-3 hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            <Avatar
              src={activity.userAvatar}
              name={activity.userName}
              size="xs"
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-[var(--color-bg-tertiary)]">
                  {activityIcons[activity.type]}
                </span>
                <p className="text-sm text-[var(--color-text-primary)]">
                  <span className="font-medium">{activity.userName}</span>
                  {' '}{activity.description}
                </p>
              </div>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                {formatRelativeTime(activity.timestamp)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-[var(--color-border)]">
        <Link href="/activity" className="text-sm text-[var(--color-brand-text)] hover:underline">
          View All Activity →
        </Link>
      </div>
    </div>
  );
}

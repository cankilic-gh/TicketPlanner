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
    <div className={cn('bg-white rounded-xl border border-[#E2E8F0] overflow-hidden', className)}>
      <div className="px-5 py-4 border-b border-[#E2E8F0]">
        <h3 className="font-semibold text-[#0F172A]">Team Activity</h3>
      </div>

      <div className="divide-y divide-[#E2E8F0] max-h-[400px] overflow-y-auto">
        {mockActivities.map((activity) => (
          <Link
            key={activity.id}
            href={`/tickets/${activity.ticketId}`}
            className="flex items-start gap-3 px-5 py-3 hover:bg-[#F8FAFC] transition-colors"
          >
            <Avatar
              src={activity.userAvatar}
              name={activity.userName}
              size="xs"
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-[#F1F5F9]">
                  {activityIcons[activity.type]}
                </span>
                <p className="text-sm text-[#0F172A]">
                  <span className="font-medium">{activity.userName}</span>
                  {' '}{activity.description}
                </p>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">
                {formatRelativeTime(activity.timestamp)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-[#E2E8F0]">
        <Link href="/activity" className="text-sm text-[#4F46E5] hover:underline">
          View All Activity →
        </Link>
      </div>
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { StatusBadge, PriorityIndicator, Avatar } from '@/components/ui';
import { mockTickets, mockUsers, mockProjects } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { Sparkles, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface FocusQueueProps {
  className?: string;
}

export function FocusQueue({ className }: FocusQueueProps) {
  // Get tickets assigned to current user (u1), sorted by priority and due date
  const focusTickets = mockTickets
    .filter((t) => t.assigneeIds.includes('u1'))
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3, none: 4 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 6);

  const getProjectColor = (projectId: string) => {
    const project = mockProjects.find((p) => p.id === projectId);
    return project?.color || '#6B7280';
  };

  const getProjectName = (projectId: string) => {
    const project = mockProjects.find((p) => p.id === projectId);
    return project?.name || 'Unknown';
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className={cn('bg-white rounded-xl border border-[#E2E8F0] overflow-hidden', className)}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        <h3 className="font-semibold text-[#0F172A]">My Focus</h3>
        <div className="flex items-center gap-2">
          <button className="text-xs px-3 py-1 rounded-full bg-[#4F46E5] text-white font-medium">All</button>
          <button className="text-xs px-3 py-1 rounded-full text-[#64748B] hover:bg-[#F1F5F9]">Today</button>
          <button className="text-xs px-3 py-1 rounded-full text-[#64748B] hover:bg-[#F1F5F9]">This Week</button>
        </div>
      </div>

      <div className="divide-y divide-[#E2E8F0]">
        {focusTickets.map((ticket) => (
          <Link
            key={ticket.id}
            href={`/tickets/${ticket.id}`}
            className="flex items-center gap-4 px-5 py-3 hover:bg-[#F8FAFC] transition-colors group"
          >
            {/* Priority */}
            <PriorityIndicator priority={ticket.priority} />

            {/* Ticket ID */}
            <span className="font-mono text-xs text-[#64748B] w-16">{ticket.id}</span>

            {/* Title & AI Summary */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0F172A] truncate group-hover:text-[#4F46E5] transition-colors">
                {ticket.title}
              </p>
              {ticket.aiSummary && (
                <p className="text-xs text-[#94A3B8] truncate mt-0.5">{ticket.aiSummary}</p>
              )}
            </div>

            {/* Project Tag */}
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: `${getProjectColor(ticket.projectId)}15`,
                color: getProjectColor(ticket.projectId),
              }}
            >
              {getProjectName(ticket.projectId)}
            </span>

            {/* Status */}
            <StatusBadge status={ticket.status} />

            {/* Due Date */}
            {ticket.dueDate && (
              <div className={cn(
                'flex items-center gap-1 text-xs',
                isOverdue(ticket.dueDate) ? 'text-[#EF4444]' : 'text-[#64748B]'
              )}>
                {isOverdue(ticket.dueDate) && <AlertCircle size={12} />}
                <Clock size={12} />
                <span>{formatRelativeTime(ticket.dueDate)}</span>
              </div>
            )}

            {/* AI Predicted ETA */}
            {ticket.aiPredictedEta && (
              <div className="flex items-center gap-1 text-xs text-[#8B5CF6]">
                <Sparkles size={12} />
                <span>{ticket.aiPredictedEta}</span>
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-[#E2E8F0]">
        <Link href="/my-tickets" className="text-sm text-[#4F46E5] hover:underline">
          View All My Tickets →
        </Link>
      </div>
    </div>
  );
}

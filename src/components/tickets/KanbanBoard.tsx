'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { StatusBadge, PriorityIndicator, Avatar, AvatarGroup, LabelBadge } from '@/components/ui';
import { mockTickets, mockUsers, mockProjects } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { STATUS_CONFIG, TYPE_CONFIG, type Ticket, type TicketStatus } from '@/types';
import {
  Sparkles,
  Clock,
  MessageSquare,
  Paperclip,
  Plus,
  MoreHorizontal,
  AlertCircle,
} from 'lucide-react';

interface KanbanBoardProps {
  tickets?: Ticket[];
  className?: string;
}

const columns: { id: TicketStatus; wipLimit?: number }[] = [
  { id: 'new' },
  { id: 'triaged' },
  { id: 'in-dev', wipLimit: 5 },
  { id: 'in-review' },
  { id: 'qa' },
  { id: 'client-review' },
  { id: 'resolved' },
];

interface KanbanCardProps {
  ticket: Ticket;
}

function KanbanCard({ ticket }: KanbanCardProps) {
  const project = mockProjects.find((p) => p.id === ticket.projectId);
  const assignees = ticket.assigneeIds.map((id) => mockUsers.find((u) => u.id === id)).filter(Boolean);
  const typeConfig = TYPE_CONFIG[ticket.type];

  const isOverdue = ticket.dueDate && new Date(ticket.dueDate) < new Date();

  // Simulate some activity counts
  const commentCount = Math.floor(Math.random() * 5);
  const attachmentCount = Math.floor(Math.random() * 3);

  const labelColors: Record<string, string> = {
    frontend: '#64748B',
    backend: '#64748B',
    urgent: '#DC2626',
    security: '#64748B',
    api: '#64748B',
    database: '#64748B',
    ui: '#64748B',
  };

  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="block bg-white rounded-lg border border-[#E2E8F0] p-3 hover:shadow-md transition-shadow group"
    >
      {/* SLA Bar */}
      {ticket.slaStatus && (
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-1 rounded-t-lg',
            ticket.slaStatus === 'on-track' && 'bg-[#10B981]',
            ticket.slaStatus === 'at-risk' && 'bg-[#F59E0B]',
            ticket.slaStatus === 'breached' && 'bg-[#EF4444]'
          )}
        />
      )}

      {/* Header: Priority + ID + Type */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <PriorityIndicator priority={ticket.priority} />
          <span className="font-mono text-xs text-[#64748B]">{ticket.id}</span>
        </div>
        <span title={typeConfig.label}>{typeConfig.icon}</span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-[#0F172A] mb-1 line-clamp-2 group-hover:text-[#4F46E5] transition-colors">
        {ticket.title}
      </h4>

      {/* AI Summary */}
      {ticket.aiSummary && (
        <p className="text-xs text-[#94A3B8] mb-2 line-clamp-1">{ticket.aiSummary}</p>
      )}

      {/* Labels */}
      {ticket.labels.length > 0 && (
        <div className="flex items-center gap-1 mb-3 flex-wrap">
          {ticket.labels.slice(0, 2).map((label) => (
            <LabelBadge
              key={label}
              label={label}
              color={labelColors[label] || '#6B7280'}
            />
          ))}
          {ticket.labels.length > 2 && (
            <span className="text-xs text-[#64748B]">+{ticket.labels.length - 2}</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
        {/* Left: Assignee */}
        <div className="flex items-center gap-2">
          {assignees.length > 0 ? (
            <AvatarGroup
              users={assignees.map((u) => ({
                id: u!.id,
                name: u!.name,
                avatar: u!.avatar,
              }))}
              max={2}
              size="xs"
            />
          ) : (
            <div className="flex items-center gap-1 text-xs text-[#8B5CF6]">
              <Sparkles size={12} />
            </div>
          )}
        </div>

        {/* Right: Meta */}
        <div className="flex items-center gap-2">
          {/* Due Date */}
          {ticket.dueDate && (
            <div className={cn(
              'flex items-center gap-1 text-xs',
              isOverdue ? 'text-[#EF4444]' : 'text-[#64748B]'
            )}>
              {isOverdue && <AlertCircle size={10} />}
              <Clock size={10} />
              <span>{formatRelativeTime(ticket.dueDate)}</span>
            </div>
          )}

          {/* Comments */}
          {commentCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-[#64748B]">
              <MessageSquare size={10} />
              <span>{commentCount}</span>
            </div>
          )}

          {/* Attachments */}
          {attachmentCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-[#64748B]">
              <Paperclip size={10} />
              <span>{attachmentCount}</span>
            </div>
          )}

          {/* AI ETA */}
          {ticket.aiPredictedEta && (
            <div className="flex items-center gap-1 text-xs text-[#8B5CF6]">
              <Sparkles size={10} />
              <span>{ticket.aiPredictedEta}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function KanbanBoard({ tickets = mockTickets, className }: KanbanBoardProps) {
  const [collapsedColumns, setCollapsedColumns] = useState<string[]>([]);

  const toggleColumn = (columnId: string) => {
    setCollapsedColumns((prev) =>
      prev.includes(columnId) ? prev.filter((id) => id !== columnId) : [...prev, columnId]
    );
  };

  const getColumnTickets = (status: TicketStatus) => {
    return tickets.filter((t) => t.status === status);
  };

  return (
    <div className={cn('flex gap-4 overflow-x-auto pb-4', className)}>
      {columns.map((column) => {
        const columnTickets = getColumnTickets(column.id);
        const config = STATUS_CONFIG[column.id];
        const isCollapsed = collapsedColumns.includes(column.id);
        const isOverWipLimit = column.wipLimit && columnTickets.length > column.wipLimit;

        return (
          <div
            key={column.id}
            className={cn(
              'flex-shrink-0 w-[300px] bg-[#F8FAFC] rounded-xl',
              isCollapsed && 'w-12'
            )}
          >
            {/* Column Header */}
            <div
              className={cn(
                'flex items-center justify-between p-3 border-b-2',
                isCollapsed && 'flex-col'
              )}
              style={{ borderColor: config.color }}
            >
              <div className={cn(
                'flex items-center gap-2',
                isCollapsed && 'flex-col'
              )}>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                {!isCollapsed && (
                  <>
                    <span className="text-sm font-semibold text-[#0F172A]">{config.label}</span>
                    <span className={cn(
                      'px-1.5 py-0.5 rounded text-xs font-medium',
                      isOverWipLimit ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#E2E8F0] text-[#64748B]'
                    )}>
                      {columnTickets.length}
                      {column.wipLimit && `/${column.wipLimit}`}
                    </span>
                  </>
                )}
              </div>

              {!isCollapsed && (
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded hover:bg-[#E2E8F0] text-[#64748B]">
                    <Plus size={16} />
                  </button>
                  <button className="p-1 rounded hover:bg-[#E2E8F0] text-[#64748B]">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Column Content */}
            {!isCollapsed && (
              <div className="p-2 space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
                {columnTickets.map((ticket) => (
                  <div key={ticket.id} className="relative">
                    <KanbanCard ticket={ticket} />
                  </div>
                ))}

                {columnTickets.length === 0 && (
                  <div className="text-center py-8 text-sm text-[#94A3B8]">
                    No tickets
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

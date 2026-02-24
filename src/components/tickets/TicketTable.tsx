'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn, getInitials, getAvatarColor } from '@/lib/utils';
import { StatusBadge, PriorityIndicator, LabelBadge } from '@/components/ui';
import { mockTickets, mockUsers, mockProjects } from '@/data/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { TYPE_CONFIG, type Ticket } from '@/types';
import {
  Clock,
  AlertCircle,
  Copy,
  MoreHorizontal,
} from 'lucide-react';

interface TicketTableProps {
  tickets?: Ticket[];
  className?: string;
}

export function TicketTable({ tickets = mockTickets, className }: TicketTableProps) {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  const getUser = (userId: string) => mockUsers.find((u) => u.id === userId);
  const getProject = (projectId: string) => mockProjects.find((p) => p.id === projectId);

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const getIdNumber = (id: string) => {
    return id.replace('TP-', '');
  };

  const toggleSelect = (ticketId: string) => {
    setSelectedTickets((prev) =>
      prev.includes(ticketId) ? prev.filter((id) => id !== ticketId) : [...prev, ticketId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedTickets.length === tickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(tickets.map((t) => t.id));
    }
  };

  const labelColors: Record<string, string> = {
    frontend: '#64748B',
    backend: '#64748B',
    urgent: '#DC2626',
    security: '#64748B',
    api: '#64748B',
    database: '#64748B',
    ui: '#64748B',
    mobile: '#64748B',
    performance: '#64748B',
    responsive: '#64748B',
    reports: '#64748B',
    blocking: '#DC2626',
    payments: '#64748B',
    accessibility: '#64748B',
    search: '#64748B',
    import: '#64748B',
    ux: '#64748B',
    safari: '#64748B',
  };

  return (
    <div className={cn('bg-white rounded-xl border border-[#E2E8F0] overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedTickets.length === tickets.length && tickets.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-[#E2E8F0] text-[#4F46E5] focus:ring-[#4F46E5]"
                />
              </th>
              <th className="w-12 px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Pri</th>
              <th className="w-16 px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">ID</th>
              <th className="w-10 px-2 py-3"></th>
              <th className="min-w-[300px] px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Title</th>
              <th className="w-28 px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Status</th>
              <th className="w-36 px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Assignee</th>
              <th className="w-40 px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Project</th>
              <th className="w-32 px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Labels</th>
              <th className="w-28 px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Due Date</th>
              <th className="w-24 px-3 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Updated</th>
              <th className="w-10 px-2 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {tickets.map((ticket) => {
              const project = getProject(ticket.projectId);
              const assignees = ticket.assigneeIds.map((id) => getUser(id)).filter(Boolean);
              const typeConfig = TYPE_CONFIG[ticket.type];

              return (
                <tr
                  key={ticket.id}
                  className={cn(
                    'hover:bg-[#F8FAFC] transition-colors group',
                    selectedTickets.includes(ticket.id) && 'bg-[#EEF2FF]'
                  )}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTickets.includes(ticket.id)}
                      onChange={() => toggleSelect(ticket.id)}
                      className="w-4 h-4 rounded border-[#E2E8F0] text-[#4F46E5] focus:ring-[#4F46E5]"
                    />
                  </td>

                  {/* Priority */}
                  <td className="px-3 py-3">
                    <PriorityIndicator priority={ticket.priority} />
                  </td>

                  {/* Ticket ID */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1 group/id">
                      <Link
                        href={`/tickets/${ticket.id}`}
                        className="font-mono text-xs text-[#64748B] hover:text-[#4F46E5]"
                      >
                        {getIdNumber(ticket.id)}
                      </Link>
                      <button className="opacity-0 group-hover/id:opacity-100 p-0.5 hover:bg-[#F1F5F9] rounded transition-opacity">
                        <Copy size={12} className="text-[#94A3B8]" />
                      </button>
                    </div>
                  </td>

                  {/* Type Icon */}
                  <td className="px-2 py-3">
                    <span title={typeConfig.label}>{typeConfig.icon}</span>
                  </td>

                  {/* Title */}
                  <td className="px-4 py-3">
                    <Link href={`/tickets/${ticket.id}`} className="block">
                      <p className="text-sm text-[#0F172A] hover:text-[#4F46E5] transition-colors truncate">
                        {ticket.title}
                      </p>
                    </Link>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3">
                    <StatusBadge status={ticket.status} />
                  </td>

                  {/* Assignee */}
                  <td className="px-3 py-3">
                    {assignees.length > 0 ? (
                      <div className="flex items-center -space-x-1">
                        {assignees.slice(0, 3).map((u) => (
                          <div
                            key={u!.id}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium text-white ring-2 ring-white"
                            style={{ backgroundColor: getAvatarColor(u!.name) }}
                            title={u!.name}
                          >
                            {getInitials(u!.name)}
                          </div>
                        ))}
                        {assignees.length > 3 && (
                          <span className="text-xs text-[#64748B] ml-2">
                            +{assignees.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-[#94A3B8]">—</span>
                    )}
                  </td>

                  {/* Project */}
                  <td className="px-3 py-3">
                    {project && (
                      <span
                        className="text-xs px-2 py-1 rounded font-medium whitespace-nowrap"
                        style={{
                          backgroundColor: `${project.color}15`,
                          color: project.color,
                        }}
                      >
                        {project.name}
                      </span>
                    )}
                  </td>

                  {/* Labels */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      {ticket.labels.slice(0, 2).map((label) => (
                        <LabelBadge
                          key={label}
                          label={label}
                          color={labelColors[label] || '#64748B'}
                        />
                      ))}
                      {ticket.labels.length > 2 && (
                        <span className="text-xs text-[#64748B]">+{ticket.labels.length - 2}</span>
                      )}
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="px-3 py-3">
                    {ticket.dueDate && (
                      <div className={cn(
                        'flex items-center gap-1 text-xs whitespace-nowrap',
                        isOverdue(ticket.dueDate) ? 'text-[#EF4444]' : 'text-[#64748B]'
                      )}>
                        {isOverdue(ticket.dueDate) && <AlertCircle size={12} />}
                        <Clock size={12} />
                        <span>{formatRelativeTime(ticket.dueDate)}</span>
                      </div>
                    )}
                  </td>

                  {/* Updated */}
                  <td className="px-3 py-3">
                    <span className="text-xs text-[#94A3B8] whitespace-nowrap">
                      {formatRelativeTime(ticket.updatedAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-2 py-3">
                    <button className="p-1 rounded hover:bg-[#F1F5F9] opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={16} className="text-[#64748B]" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions Bar */}
      {selectedTickets.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-4 z-50">
          <span className="text-sm font-medium">{selectedTickets.length} selected</span>
          <button className="text-xs text-[#94A3B8] hover:text-white">Clear</button>
          <div className="h-4 w-px bg-[#334155]" />
          <button className="text-xs hover:text-[#4F46E5]">Status</button>
          <button className="text-xs hover:text-[#4F46E5]">Priority</button>
          <button className="text-xs hover:text-[#4F46E5]">Assign</button>
          <button className="text-xs hover:text-[#4F46E5]">Labels</button>
          <button className="text-xs text-[#EF4444] hover:text-[#FCA5A5]">Delete</button>
        </div>
      )}
    </div>
  );
}

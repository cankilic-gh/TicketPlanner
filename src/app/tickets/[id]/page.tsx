'use client';

import { use } from 'react';
import { AppLayout } from '@/components/layout';
import { Card, Button, StatusBadge, PriorityIndicator, Avatar, LabelBadge } from '@/components/ui';
import { mockTickets, mockUsers, mockProjects } from '@/data/mockData';
import { formatRelativeTime, formatDate } from '@/lib/utils';
import { STATUS_CONFIG, TYPE_CONFIG, PRIORITY_CONFIG, type TicketStatus } from '@/types';
import {
  Sparkles,
  Clock,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Link as LinkIcon,
  Pencil,
  ChevronRight,
  MessageSquare,
  Paperclip,
  GitBranch,
  GitPullRequest,
  Users,
  Calendar,
  Timer,
  Eye,
  MoreHorizontal,
  Send,
  Lock,
  Globe,
} from 'lucide-react';

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const ticket = mockTickets.find((t) => t.id === id) || mockTickets[0];
  const project = mockProjects.find((p) => p.id === ticket.projectId);
  const assignees = ticket.assigneeIds.map((aid) => mockUsers.find((u) => u.id === aid)).filter(Boolean);
  const reporter = mockUsers.find((u) => u.id === ticket.reporterId);
  const typeConfig = TYPE_CONFIG[ticket.type];

  const isOverdue = ticket.dueDate && new Date(ticket.dueDate) < new Date();

  // Visual status flow
  const statusFlow: TicketStatus[] = ['new', 'triaged', 'in-dev', 'in-review', 'qa', 'resolved'];
  const currentStatusIndex = statusFlow.indexOf(ticket.status);

  const labelColors: Record<string, string> = {
    frontend: '#3B82F6',
    backend: '#10B981',
    urgent: '#EF4444',
    security: '#F59E0B',
    api: '#8B5CF6',
    database: '#06B6D4',
    ui: '#EC4899',
    safari: '#F97316',
    blocking: '#DC2626',
  };

  // Mock comments
  const comments = [
    {
      id: 'c1',
      userId: 'u1',
      content: 'I\'ve identified the issue. It seems to be related to the Safari-specific WebSocket handling. Working on a fix now.',
      visibility: 'internal' as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: 'c2',
      userId: 'u7',
      content: 'Thanks for the update. The client is asking for an ETA - can you provide one?',
      visibility: 'internal' as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: 'c3',
      userId: 'u1',
      content: 'We\'re working on resolving this issue. Expected fix within 6 hours. Thank you for your patience.',
      visibility: 'client' as const,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ];

  return (
    <AppLayout
      breadcrumbs={[
        { label: project?.name || 'Project', href: `/projects/${project?.id}` },
        { label: ticket.id },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            {/* Ticket ID & Actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-[#64748B]">{ticket.id}</span>
                <button className="p-1 hover:bg-[#F1F5F9] rounded" title="Copy ID">
                  <Copy size={14} className="text-[#94A3B8]" />
                </button>
                <button className="p-1 hover:bg-[#F1F5F9] rounded" title="Copy Link">
                  <LinkIcon size={14} className="text-[#94A3B8]" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye size={14} />
                  <span>Watch</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal size={14} />
                </Button>
              </div>
            </div>

            {/* Title */}
            <div className="group flex items-start gap-2 mb-3">
              <h1 className="text-xl font-semibold text-[#0F172A] flex-1">{ticket.title}</h1>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#F1F5F9] rounded transition-opacity">
                <Pencil size={14} className="text-[#94A3B8]" />
              </button>
            </div>

            {/* AI Summary */}
            {ticket.aiSummary && (
              <div className="flex items-start gap-2 mb-4 text-sm text-[#64748B]">
                <Sparkles size={14} className="text-[#8B5CF6] mt-0.5" />
                <span>{ticket.aiSummary}</span>
              </div>
            )}

            {/* Status Flow */}
            <div className="flex items-center gap-1 py-4 overflow-x-auto">
              {statusFlow.map((status, index) => {
                const config = STATUS_CONFIG[status];
                const isCompleted = index < currentStatusIndex;
                const isCurrent = status === ticket.status;

                return (
                  <div key={status} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        isCurrent
                          ? 'bg-[#4F46E5] text-white'
                          : isCompleted
                            ? 'bg-[#D1FAE5] text-[#059669]'
                            : 'bg-[#F1F5F9] text-[#94A3B8]'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 size={12} />}
                      <span>{config.label}</span>
                    </div>
                    {index < statusFlow.length - 1 && (
                      <ChevronRight size={16} className="text-[#D1D5DB] mx-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Description */}
          <Card>
            <h3 className="font-semibold text-[#0F172A] mb-4">Description</h3>
            <div className="prose prose-sm max-w-none text-[#475569]">
              <p>{ticket.description}</p>
              <h4>Steps to Reproduce:</h4>
              <ol>
                <li>Open Safari browser (version 17+)</li>
                <li>Navigate to login page</li>
                <li>Enter valid credentials</li>
                <li>Click "Sign In"</li>
                <li>Observe 500 error</li>
              </ol>
              <h4>Expected Behavior:</h4>
              <p>User should be logged in and redirected to dashboard.</p>
              <h4>Actual Behavior:</h4>
              <p>500 Internal Server Error is displayed.</p>
            </div>
          </Card>

          {/* Git Integration */}
          <Card>
            <h3 className="font-semibold text-[#0F172A] mb-4">Git Integration</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                <GitBranch size={16} className="text-[#64748B]" />
                <span className="font-mono text-sm text-[#475569]">fix/safari-login-500-error</span>
                <button className="ml-auto p-1 hover:bg-[#E2E8F0] rounded">
                  <Copy size={12} className="text-[#94A3B8]" />
                </button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                <GitPullRequest size={16} className="text-[#8B5CF6]" />
                <span className="text-sm text-[#475569]">PR #234: Fix Safari WebSocket handling</span>
                <span className="ml-auto px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] text-xs font-medium rounded">Draft</span>
              </div>
            </div>
          </Card>

          {/* Activity & Comments */}
          <Card>
            <div className="flex items-center gap-4 mb-4 border-b border-[#E2E8F0] pb-3">
              <button className="text-sm font-medium text-[#4F46E5] border-b-2 border-[#4F46E5] pb-3 -mb-3">All</button>
              <button className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] pb-3 -mb-3">Comments</button>
              <button className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] pb-3 -mb-3">Activity</button>
              <button className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] pb-3 -mb-3">Internal Only</button>
            </div>

            {/* Comments List */}
            <div className="space-y-4 mb-6">
              {comments.map((comment) => {
                const user = mockUsers.find((u) => u.id === comment.userId);
                const isInternal = comment.visibility === 'internal';

                return (
                  <div
                    key={comment.id}
                    className={`p-4 rounded-lg ${
                      isInternal ? 'bg-[#FFF7ED] border-l-4 border-[#F59E0B]' : 'bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar src={user?.avatar} name={user?.name || 'Unknown'} size="sm" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-[#0F172A]">{user?.name}</span>
                          <span className="text-xs text-[#94A3B8]">{formatRelativeTime(comment.createdAt)}</span>
                          {isInternal ? (
                            <span className="flex items-center gap-1 text-xs text-[#D97706]">
                              <Lock size={10} />
                              Internal
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-[#059669]">
                              <Globe size={10} />
                              Client visible
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#475569]">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comment Input */}
            <div className="border-t border-[#E2E8F0] pt-4">
              <div className="flex items-center gap-2 mb-3">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-[#FFF7ED] text-[#D97706]">
                  <Lock size={12} />
                  Internal Note
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-[#64748B] hover:bg-[#F1F5F9]">
                  <Globe size={12} />
                  Client Reply
                </button>
              </div>
              <div className="flex items-start gap-3">
                <Avatar src={mockUsers[0].avatar} name={mockUsers[0].name} size="sm" />
                <div className="flex-1">
                  <textarea
                    placeholder="Write a comment..."
                    className="w-full p-3 border border-[#E2E8F0] rounded-lg text-sm resize-none focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-[#F1F5F9] rounded">
                        <Paperclip size={16} className="text-[#64748B]" />
                      </button>
                    </div>
                    <Button size="sm">
                      <Send size={14} />
                      <span>Send</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Metadata */}
        <div className="space-y-4">
          {/* Status */}
          <Card padding="sm">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Status</label>
            <div className="mt-2">
              <StatusBadge status={ticket.status} />
            </div>
          </Card>

          {/* Priority */}
          <Card padding="sm">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Priority</label>
            <div className="mt-2 flex items-center gap-2">
              <PriorityIndicator priority={ticket.priority} showLabel />
            </div>
          </Card>

          {/* Type */}
          <Card padding="sm">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Type</label>
            <div className="mt-2 flex items-center gap-2">
              <span>{typeConfig.icon}</span>
              <span className="text-sm text-[#0F172A]">{typeConfig.label}</span>
            </div>
          </Card>

          {/* Assignee */}
          <Card padding="sm">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Assignee</label>
            <div className="mt-2 space-y-2">
              {assignees.length > 0 ? (
                assignees.map((user) => (
                  <div key={user!.id} className="flex items-center gap-2">
                    <Avatar
                      src={user!.avatar}
                      name={user!.name}
                      size="sm"
                      showOnline
                      isOnline={user!.isOnline}
                      showWorkload
                      workloadLevel={user!.workloadLevel}
                    />
                    <span className="text-sm text-[#0F172A]">{user!.name}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 text-[#8B5CF6]">
                  <Sparkles size={14} />
                  <span className="text-sm">AI suggests: Zeynep Kaya</span>
                </div>
              )}
            </div>
          </Card>

          {/* Reporter */}
          <Card padding="sm">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Reporter</label>
            <div className="mt-2 flex items-center gap-2">
              <Avatar src={reporter?.avatar} name={reporter?.name || 'Unknown'} size="sm" />
              <span className="text-sm text-[#0F172A]">{reporter?.name}</span>
            </div>
          </Card>

          {/* Project */}
          <Card padding="sm">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Project</label>
            <div className="mt-2 flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project?.color }}
              />
              <span className="text-sm text-[#0F172A]">{project?.name}</span>
            </div>
          </Card>

          {/* Labels */}
          <Card padding="sm">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Labels</label>
            <div className="mt-2 flex flex-wrap gap-1">
              {ticket.labels.map((label) => (
                <LabelBadge
                  key={label}
                  label={label}
                  color={labelColors[label] || '#6B7280'}
                />
              ))}
            </div>
          </Card>

          {/* Due Date */}
          <Card padding="sm">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Due Date</label>
            <div className={`mt-2 flex items-center gap-2 ${isOverdue ? 'text-[#EF4444]' : 'text-[#0F172A]'}`}>
              {isOverdue && <AlertCircle size={14} />}
              <Calendar size={14} className="text-[#64748B]" />
              <span className="text-sm">{ticket.dueDate ? formatDate(ticket.dueDate) : 'No due date'}</span>
            </div>
            {isOverdue && (
              <p className="text-xs text-[#EF4444] mt-1">Overdue by {formatRelativeTime(ticket.dueDate!)}</p>
            )}
          </Card>

          {/* AI Predicted ETA */}
          {ticket.aiPredictedEta && (
            <Card padding="sm">
              <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">AI Predicted ETA</label>
              <div className="mt-2 flex items-center gap-2 text-[#8B5CF6]">
                <Sparkles size={14} />
                <span className="text-sm font-medium">{ticket.aiPredictedEta}</span>
              </div>
            </Card>
          )}

          {/* SLA */}
          {ticket.slaStatus && (
            <Card padding="sm">
              <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">SLA Status</label>
              <div className={`mt-2 flex items-center gap-2 ${
                ticket.slaStatus === 'on-track' ? 'text-[#10B981]' :
                ticket.slaStatus === 'at-risk' ? 'text-[#F59E0B]' : 'text-[#EF4444]'
              }`}>
                {ticket.slaStatus === 'on-track' && <CheckCircle2 size={14} />}
                {ticket.slaStatus === 'at-risk' && <AlertTriangle size={14} />}
                {ticket.slaStatus === 'breached' && <AlertCircle size={14} />}
                <span className="text-sm font-medium capitalize">{ticket.slaStatus.replace('-', ' ')}</span>
              </div>
            </Card>
          )}

          {/* Time Tracking */}
          <Card padding="sm">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Time Tracking</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Estimated:</span>
                <span className="text-[#0F172A]">8h</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Logged:</span>
                <span className="text-[#0F172A]">5h 30m</span>
              </div>
              <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: '68%' }} />
              </div>
              <Button variant="secondary" size="sm" className="w-full">
                <Timer size={14} />
                <span>Log Time</span>
              </Button>
            </div>
          </Card>

          {/* Watchers */}
          <Card padding="sm">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Watchers</label>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex -space-x-2">
                {mockUsers.slice(0, 3).map((user) => (
                  <Avatar key={user.id} src={user.avatar} name={user.name} size="xs" className="ring-2 ring-white" />
                ))}
              </div>
              <button className="text-xs text-[#4F46E5] hover:underline">+ Add</button>
            </div>
          </Card>

          {/* Meta */}
          <Card padding="sm">
            <div className="space-y-2 text-xs text-[#64748B]">
              <div className="flex justify-between">
                <span>Created:</span>
                <span>{formatDate(ticket.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span>Updated:</span>
                <span>{formatRelativeTime(ticket.updatedAt)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

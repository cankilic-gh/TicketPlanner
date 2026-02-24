'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout';
import { Button, Card, Avatar, AvatarGroup, StatusBadge, PriorityIndicator } from '@/components/ui';
import { mockProjects, mockUsers, mockTickets, mockClients } from '@/data/mockData';
import { cn, formatRelativeTime } from '@/lib/utils';
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Ticket,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  ExternalLink,
  Settings,
} from 'lucide-react';

type ViewMode = 'grid' | 'list';

interface ProjectCardProps {
  project: typeof mockProjects[0];
  viewMode: ViewMode;
}

function ProjectCard({ project, viewMode }: ProjectCardProps) {
  const client = mockClients.find((c) => c.id === project.clientId);
  const projectTickets = mockTickets.filter((t) => t.projectId === project.id);
  const teamMembers = project.teamIds.map((id) => mockUsers.find((u) => u.id === id)).filter(Boolean);

  const completedTickets = projectTickets.filter((t) => t.status === 'resolved').length;
  const totalTickets = projectTickets.length;
  const progress = totalTickets > 0 ? Math.round((completedTickets / totalTickets) * 100) : 0;

  const overdueTickets = projectTickets.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'resolved'
  ).length;

  const criticalTickets = projectTickets.filter((t) => t.priority === 'critical').length;

  const statusColors: Record<string, string> = {
    active: '#10B981',
    'on-hold': '#F59E0B',
    completed: '#6B7280',
    planning: '#3B82F6',
  };

  const healthScore = project.health || 85;
  const healthColor = healthScore >= 80 ? '#10B981' : healthScore >= 60 ? '#F59E0B' : '#EF4444';

  if (viewMode === 'list') {
    return (
      <Link href={`/projects/${project.id}`} className="block">
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#E2E8F0] hover:shadow-md transition-shadow">
          {/* Project Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: project.color || '#4F46E5' }}
          >
            {project.name.charAt(0)}
          </div>

          {/* Project Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[#0F172A] truncate">{project.name}</h3>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                style={{
                  backgroundColor: `${statusColors[project.status]}20`,
                  color: statusColors[project.status],
                }}
              >
                {project.status.replace('-', ' ')}
              </span>
            </div>
            <p className="text-sm text-[#64748B] truncate">{client?.name || 'Internal Project'}</p>
          </div>

          {/* Progress */}
          <div className="w-32">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#64748B]">Progress</span>
              <span className="text-xs font-medium text-[#0F172A]">{progress}%</span>
            </div>
            <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, backgroundColor: project.color || '#4F46E5' }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1.5 text-[#64748B]">
              <Ticket size={14} />
              <span>{totalTickets}</span>
            </div>
            {overdueTickets > 0 && (
              <div className="flex items-center gap-1.5 text-[#EF4444]">
                <AlertCircle size={14} />
                <span>{overdueTickets}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-[#64748B]">
              <Users size={14} />
              <span>{teamMembers.length}</span>
            </div>
          </div>

          {/* Team */}
          <AvatarGroup
            users={teamMembers.slice(0, 3).map((u) => ({
              id: u!.id,
              name: u!.name,
              avatar: u!.avatar,
            }))}
            max={3}
            size="sm"
          />

          {/* Health */}
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: `${healthColor}15`,
                color: healthColor,
              }}
            >
              {healthScore}
            </div>
          </div>

          {/* Actions */}
          <button className="p-2 rounded-lg hover:bg-[#F1F5F9] text-[#64748B]">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/projects/${project.id}`} className="block">
      <Card className="hover:shadow-lg transition-shadow group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: project.color || '#4F46E5' }}
            >
              {project.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-[#64748B]">{client?.name || 'Internal Project'}</p>
            </div>
          </div>
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
            style={{
              backgroundColor: `${statusColors[project.status]}20`,
              color: statusColors[project.status],
            }}
          >
            {project.status.replace('-', ' ')}
          </span>
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-sm text-[#64748B] mb-4 line-clamp-2">{project.description}</p>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#64748B]">Progress</span>
            <span className="text-xs font-medium text-[#0F172A]">
              {completedTickets}/{totalTickets} tickets ({progress}%)
            </span>
          </div>
          <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, backgroundColor: project.color || '#4F46E5' }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-[#F8FAFC] rounded-lg">
            <div className="text-lg font-semibold text-[#0F172A]">{totalTickets}</div>
            <div className="text-xs text-[#64748B]">Tickets</div>
          </div>
          <div className="text-center p-2 bg-[#F8FAFC] rounded-lg">
            <div className={cn('text-lg font-semibold', overdueTickets > 0 ? 'text-[#EF4444]' : 'text-[#0F172A]')}>
              {overdueTickets}
            </div>
            <div className="text-xs text-[#64748B]">Overdue</div>
          </div>
          <div className="text-center p-2 bg-[#F8FAFC] rounded-lg">
            <div
              className="text-lg font-semibold"
              style={{ color: healthColor }}
            >
              {healthScore}
            </div>
            <div className="text-xs text-[#64748B]">Health</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
          <AvatarGroup
            users={teamMembers.slice(0, 4).map((u) => ({
              id: u!.id,
              name: u!.name,
              avatar: u!.avatar,
            }))}
            max={4}
            size="sm"
          />

          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <Calendar size={12} />
            <span>Updated {formatRelativeTime(project.updatedAt)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const projectStats = {
    total: mockProjects.length,
    active: mockProjects.filter((p) => p.status === 'active').length,
    onHold: mockProjects.filter((p) => p.status === 'on-hold').length,
    completed: mockProjects.filter((p) => p.status === 'completed').length,
  };

  return (
    <AppLayout breadcrumbs={[{ label: 'Projects' }]}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F172A]">Projects</h1>
          <p className="text-[#64748B] mt-1">{mockProjects.length} projects total</p>
        </div>
        <Button>
          <Plus size={16} />
          <span>New Project</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="!p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Total Projects</p>
              <p className="text-2xl font-semibold text-[#0F172A]">{projectStats.total}</p>
            </div>
            <div className="w-10 h-10 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center">
              <LayoutGrid className="text-[#4F46E5]" size={20} />
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Active</p>
              <p className="text-2xl font-semibold text-[#10B981]">{projectStats.active}</p>
            </div>
            <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-[#10B981]" size={20} />
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B]">On Hold</p>
              <p className="text-2xl font-semibold text-[#F59E0B]">{projectStats.onHold}</p>
            </div>
            <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center">
              <Minus className="text-[#F59E0B]" size={20} />
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Completed</p>
              <p className="text-2xl font-semibold text-[#6B7280]">{projectStats.completed}</p>
            </div>
            <div className="w-10 h-10 bg-[#6B7280]/10 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-[#6B7280]" size={20} />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-9 pl-9 pr-3 rounded-lg bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-sm text-[#475569] focus:outline-none focus:border-[#4F46E5]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="planning">Planning</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              viewMode === 'grid' ? 'bg-white text-[#0F172A] shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
            )}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              viewMode === 'list' ? 'bg-white text-[#0F172A] shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
            )}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className={cn(viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-3')}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} viewMode={viewMode} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#64748B]">No projects found matching your criteria.</p>
        </div>
      )}
    </AppLayout>
  );
}

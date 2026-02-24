'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import {
  Search,
  Sparkles,
  Filter,
  Plus,
  Save,
  ChevronDown,
  X,
  LayoutList,
  Kanban,
  GanttChart,
  Calendar,
  Rows3,
  Rows2,
  Rows4,
} from 'lucide-react';

interface TicketFiltersProps {
  className?: string;
  activeView?: 'list' | 'board' | 'timeline' | 'calendar';
  onViewChange?: (view: 'list' | 'board' | 'timeline' | 'calendar') => void;
}

const quickFilters = [
  { id: 'my-tickets', label: 'My Tickets', count: 12 },
  { id: 'unassigned', label: 'Unassigned', count: 5 },
  { id: 'overdue', label: 'Overdue', count: 2 },
  { id: 'critical', label: 'Critical', count: 3 },
  { id: 'blocked', label: 'Blocked', count: 1 },
  { id: 'client-tickets', label: 'Client Tickets', count: 8 },
  { id: 'updated-today', label: 'Updated Today', count: 15 },
];

export function TicketFilters({ className, activeView = 'list', onViewChange }: TicketFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  };

  const views = [
    { id: 'list', icon: <LayoutList size={16} />, label: 'List' },
    { id: 'board', icon: <Kanban size={16} />, label: 'Board' },
    { id: 'timeline', icon: <GanttChart size={16} />, label: 'Timeline' },
    { id: 'calendar', icon: <Calendar size={16} />, label: 'Calendar' },
  ] as const;

  return (
    <div className={cn('space-y-4', className)}>
      {/* View Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => onViewChange?.(view.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                activeView === view.id
                  ? 'bg-white text-[#0F172A] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              )}
            >
              {view.icon}
              <span>{view.label}</span>
            </button>
          ))}
        </div>

        {/* Density Toggle */}
        <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg">
          <button className="p-1.5 rounded-md text-[#64748B] hover:text-[#0F172A]" title="Compact">
            <Rows4 size={16} />
          </button>
          <button className="p-1.5 rounded-md bg-white text-[#0F172A] shadow-sm" title="Standard">
            <Rows3 size={16} />
          </button>
          <button className="p-1.5 rounded-md text-[#64748B] hover:text-[#0F172A]" title="Comfortable">
            <Rows2 size={16} />
          </button>
        </div>
      </div>

      {/* Search & Quick Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search or ask: 'critical bugs in Kansas Courts'..."
            className="w-full h-10 pl-10 pr-12 rounded-lg bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Sparkles size={16} className="text-[#8B5CF6]" />
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                activeFilters.includes(filter.id)
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              )}
            >
              {filter.label}
              <span className={cn(
                'px-1.5 py-0.5 rounded-full text-[10px]',
                activeFilters.includes(filter.id)
                  ? 'bg-white/20'
                  : 'bg-[#E2E8F0]'
              )}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Filter size={14} />
            <span>Add Filter</span>
            <ChevronDown size={14} className={cn('transition-transform', showAdvanced && 'rotate-180')} />
          </Button>

          {activeFilters.length > 0 && (
            <>
              <div className="h-4 w-px bg-[#E2E8F0]" />
              <button
                onClick={() => setActiveFilters([])}
                className="text-xs text-[#64748B] hover:text-[#0F172A] flex items-center gap-1"
              >
                <X size={12} />
                Clear All
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Save size={14} />
            <span>Save View</span>
          </Button>

          <div className="h-4 w-px bg-[#E2E8F0]" />

          <div className="flex items-center gap-1">
            <span className="text-xs text-[#64748B]">Group by:</span>
            <button className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-[#475569] hover:bg-[#F1F5F9]">
              None
              <ChevronDown size={12} />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-[#64748B]">Sort by:</span>
            <button className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-[#475569] hover:bg-[#F1F5F9]">
              Updated
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      {showAdvanced && (
        <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <select className="h-8 px-3 rounded-md border border-[#E2E8F0] bg-white text-sm text-[#475569] focus:outline-none focus:border-[#4F46E5]">
              <option>Status</option>
              <option>Priority</option>
              <option>Assignee</option>
              <option>Project</option>
              <option>Type</option>
              <option>Label</option>
              <option>Due Date</option>
              <option>Created</option>
            </select>

            <select className="h-8 px-3 rounded-md border border-[#E2E8F0] bg-white text-sm text-[#475569] focus:outline-none focus:border-[#4F46E5]">
              <option>is</option>
              <option>is not</option>
              <option>is any of</option>
              <option>is none of</option>
            </select>

            <select className="h-8 px-3 rounded-md border border-[#E2E8F0] bg-white text-sm text-[#475569] focus:outline-none focus:border-[#4F46E5] flex-1">
              <option>Select value...</option>
              <option>New</option>
              <option>In Dev</option>
              <option>In Review</option>
              <option>QA</option>
            </select>

            <Button variant="ghost" size="sm">
              <Plus size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

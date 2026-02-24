'use client';

import { useState, useEffect, useRef, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { mockTickets, mockProjects, mockUsers } from '@/data/mockData';
import {
  Search,
  Sparkles,
  ArrowRight,
  Plus,
  Ticket,
  FolderKanban,
  Users,
  Settings,
  LayoutDashboard,
  GitBranch,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  Bug,
  Zap,
  Command,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Build command items
  const commands: CommandItem[] = [
    // Quick Actions
    {
      id: 'new-ticket',
      label: 'Create New Ticket',
      icon: <Plus size={16} />,
      action: () => {
        router.push('/tickets/new');
        onClose();
      },
      category: 'Quick Actions',
      keywords: ['create', 'add', 'new', 'ticket'],
    },
    {
      id: 'new-project',
      label: 'Create New Project',
      icon: <FolderKanban size={16} />,
      action: () => {
        router.push('/projects/new');
        onClose();
      },
      category: 'Quick Actions',
      keywords: ['create', 'add', 'new', 'project'],
    },
    {
      id: 'ai-assign',
      label: 'AI Auto-Assign Tickets',
      icon: <Sparkles size={16} className="text-[#8B5CF6]" />,
      action: () => {
        alert('AI Auto-Assign triggered!');
        onClose();
      },
      category: 'Quick Actions',
      keywords: ['ai', 'auto', 'assign', 'smart'],
    },

    // Navigation
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      icon: <LayoutDashboard size={16} />,
      action: () => {
        router.push('/');
        onClose();
      },
      category: 'Navigation',
      keywords: ['home', 'dashboard', 'main'],
    },
    {
      id: 'nav-tickets',
      label: 'Go to All Tickets',
      icon: <Ticket size={16} />,
      action: () => {
        router.push('/tickets');
        onClose();
      },
      category: 'Navigation',
      keywords: ['tickets', 'issues', 'bugs'],
    },
    {
      id: 'nav-projects',
      label: 'Go to Projects',
      icon: <FolderKanban size={16} />,
      action: () => {
        router.push('/projects');
        onClose();
      },
      category: 'Navigation',
      keywords: ['projects', 'workspace'],
    },
    {
      id: 'nav-team',
      label: 'Go to Team',
      icon: <Users size={16} />,
      action: () => {
        router.push('/team');
        onClose();
      },
      category: 'Navigation',
      keywords: ['team', 'members', 'people'],
    },
    {
      id: 'nav-settings',
      label: 'Go to Settings',
      icon: <Settings size={16} />,
      action: () => {
        router.push('/settings');
        onClose();
      },
      category: 'Navigation',
      keywords: ['settings', 'preferences', 'config'],
    },

    // Recent Tickets (dynamic)
    ...mockTickets.slice(0, 5).map((ticket) => ({
      id: `ticket-${ticket.id}`,
      label: ticket.title,
      description: ticket.id,
      icon: ticket.type === 'bug' ? <Bug size={16} className="text-[#EF4444]" /> : <Ticket size={16} />,
      action: () => {
        router.push(`/tickets/${ticket.id}`);
        onClose();
      },
      category: 'Recent Tickets',
      keywords: [ticket.id.toLowerCase(), ...ticket.labels],
    })),

    // Projects (dynamic)
    ...mockProjects.map((project) => ({
      id: `project-${project.id}`,
      label: project.name,
      description: `${project.openTickets} open tickets`,
      icon: <FolderKanban size={16} style={{ color: project.color }} />,
      action: () => {
        router.push(`/projects/${project.id}`);
        onClose();
      },
      category: 'Projects',
      keywords: [project.name.toLowerCase()],
    })),

    // Team Members (dynamic)
    ...mockUsers.slice(0, 4).map((user) => ({
      id: `user-${user.id}`,
      label: user.name,
      description: user.role,
      icon: (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-4 h-4 rounded-full"
        />
      ),
      action: () => {
        router.push(`/team/${user.id}`);
        onClose();
      },
      category: 'Team',
      keywords: [user.name.toLowerCase(), user.role],
    })),
  ];

  // Filter commands based on query
  const filteredCommands = query
    ? commands.filter((cmd) => {
        const searchText = query.toLowerCase();
        return (
          cmd.label.toLowerCase().includes(searchText) ||
          cmd.description?.toLowerCase().includes(searchText) ||
          cmd.keywords?.some((kw) => kw.includes(searchText))
        );
      })
    : commands;

  // Group by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // Flatten for index navigation
  const flattenedCommands = Object.values(groupedCommands).flat();

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => (i + 1) % flattenedCommands.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => (i - 1 + flattenedCommands.length) % flattenedCommands.length);
          break;
        case 'Enter':
          e.preventDefault();
          flattenedCommands[activeIndex]?.action();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, flattenedCommands]);

  // Scroll active item into view
  useEffect(() => {
    const activeElement = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    activeElement?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  let globalIndex = -1;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* Dialog */}
        <div className="fixed inset-0 flex items-start justify-center pt-[15vh] px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 border-b border-[#E2E8F0]">
                <Search size={20} className="text-[#94A3B8]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  placeholder="Search or type a command..."
                  className="flex-1 h-14 bg-transparent text-[#0F172A] placeholder-[#94A3B8] text-base focus:outline-none"
                />
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#F1F5F9] text-xs text-[#64748B]">
                  <Command size={12} />
                  <span>K</span>
                </div>
              </div>

              {/* AI Natural Language Hint */}
              {query.length > 5 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B5CF6]/5 to-[#4F46E5]/5 border-b border-[#E2E8F0]">
                  <Sparkles size={14} className="text-[#8B5CF6]" />
                  <span className="text-xs text-[#64748B]">
                    Try asking: &quot;show critical bugs&quot; or &quot;my overdue tickets&quot;
                  </span>
                </div>
              )}

              {/* Results */}
              <div ref={listRef} className="max-h-[400px] overflow-y-auto py-2">
                {Object.entries(groupedCommands).map(([category, items]) => (
                  <div key={category}>
                    <div className="px-4 py-2 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                      {category}
                    </div>
                    {items.map((item) => {
                      globalIndex++;
                      const index = globalIndex;
                      const isActive = index === activeIndex;

                      return (
                        <button
                          key={item.id}
                          data-index={index}
                          onClick={item.action}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                            isActive ? 'bg-[#4F46E5] text-white' : 'text-[#0F172A] hover:bg-[#F1F5F9]'
                          )}
                        >
                          <span className={cn(isActive ? 'text-white' : 'text-[#64748B]')}>
                            {item.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              'text-sm font-medium truncate',
                              isActive ? 'text-white' : 'text-[#0F172A]'
                            )}>
                              {item.label}
                            </p>
                            {item.description && (
                              <p className={cn(
                                'text-xs truncate',
                                isActive ? 'text-white/70' : 'text-[#64748B]'
                              )}>
                                {item.description}
                              </p>
                            )}
                          </div>
                          {isActive && (
                            <ArrowRight size={14} className="text-white/70" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}

                {flattenedCommands.length === 0 && (
                  <div className="px-4 py-8 text-center">
                    <Search size={40} className="mx-auto text-[#E2E8F0] mb-3" />
                    <p className="text-sm text-[#64748B]">No results found for &quot;{query}&quot;</p>
                    <p className="text-xs text-[#94A3B8] mt-1">Try a different search term</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="flex items-center gap-4 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0] font-mono text-[10px]">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0] font-mono text-[10px]">↵</kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0] font-mono text-[10px]">esc</kbd>
                    Close
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#8B5CF6]">
                  <Sparkles size={12} />
                  <span>AI-powered search</span>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

// Global keyboard listener hook
export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isOpen, setIsOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}

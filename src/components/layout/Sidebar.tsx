'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, Button, CountBadge } from '@/components/ui';
import { currentUser, mockProjects } from '@/data/mockData';
import {
  LayoutDashboard,
  Ticket,
  ListTodo,
  FolderKanban,
  Sparkles,
  Users,
  Building2,
  BarChart3,
  Settings,
  Plus,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  LogOut,
  User,
  Bell,
  Moon,
  Keyboard,
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  isActive?: boolean;
  isCollapsed?: boolean;
}

function NavItem({ href, icon, label, badge, isActive, isCollapsed }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive
          ? 'bg-[var(--color-brand-light)] text-[var(--color-brand-text)]'
          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]',
        isCollapsed && 'justify-center px-2'
      )}
      title={isCollapsed ? label : undefined}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && (
        <>
          <span className="flex-1">{label}</span>
          {badge !== undefined && badge > 0 && (
            <CountBadge count={badge} />
          )}
        </>
      )}
    </Link>
  );
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { href: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { href: '/my-tickets', icon: <Ticket size={20} />, label: 'My Tickets', badge: 12 },
    { href: '/tickets', icon: <ListTodo size={20} />, label: 'All Tickets' },
    { href: '/projects', icon: <FolderKanban size={20} />, label: 'Projects' },
    { href: '/ai-insights', icon: <Sparkles size={20} />, label: 'AI Insights' },
    { href: '/team', icon: <Users size={20} />, label: 'Team & Workload' },
    { href: '/clients', icon: <Building2 size={20} />, label: 'Clients' },
    { href: '/reports', icon: <BarChart3 size={20} />, label: 'Reports' },
    { href: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-[var(--color-bg-primary)] border-r border-[var(--color-border)] flex flex-col z-40 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className={cn(
        'h-14 flex items-center border-b border-[var(--color-border)] px-4',
        isCollapsed && 'justify-center px-2'
      )}>
        {!isCollapsed ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-primary)] flex items-center justify-center">
                <Ticket size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-[var(--color-text-primary)]">TicketPlanner</h1>
                <p className="text-xs text-[var(--color-text-muted)]">Acme Development</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-md hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] transition-colors"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] transition-colors"
          >
            <PanelLeft size={18} />
          </button>
        )}
      </div>

      {/* Quick Create */}
      <div className={cn('p-3', isCollapsed && 'px-2')}>
        <Button
          className={cn('w-full', isCollapsed && 'px-0')}
          size="sm"
        >
          <Plus size={16} />
          {!isCollapsed && <span>New Ticket</span>}
          {!isCollapsed && <kbd className="ml-auto text-[10px] opacity-60 bg-[var(--color-bg-primary)]/20 px-1.5 py-0.5 rounded">C</kbd>}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}

        {/* Projects Section */}
        {!isCollapsed && (
          <div className="pt-4">
            <button
              onClick={() => setProjectsExpanded(!projectsExpanded)}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hover:text-[var(--color-text-primary)]"
            >
              <span>Projects</span>
              <div className="flex items-center gap-1">
                <Plus size={14} className="hover:text-[var(--color-brand-text)]" />
                {projectsExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
            </button>
            {projectsExpanded && (
              <div className="mt-1 space-y-0.5">
                {mockProjects.slice(0, 5).map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="truncate flex-1">{project.name}</span>
                    <span className="text-xs text-[var(--color-text-tertiary)]">{project.openTickets}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* User Section */}
      <div className={cn(
        'border-t border-[var(--color-border)] p-3',
        isCollapsed && 'px-2'
      )}>
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={cn(
              'flex items-center gap-3 w-full p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors',
              isCollapsed && 'justify-center'
            )}
          >
            <Avatar
              src={currentUser.avatar}
              name={currentUser.name}
              size="sm"
              showOnline
              isOnline={currentUser.isOnline}
            />
            {!isCollapsed && (
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{currentUser.name}</p>
                <p className="text-xs text-[var(--color-text-muted)] capitalize">{currentUser.role}</p>
              </div>
            )}
          </button>

          {/* User Menu Dropdown */}
          {userMenuOpen && !isCollapsed && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] shadow-lg py-1 z-50">
              <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]">
                <User size={16} />
                <span>My Profile</span>
              </Link>
              <Link href="/notifications" className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]">
                <Bell size={16} />
                <span>Notifications</span>
              </Link>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] w-full">
                <Moon size={16} />
                <span>Dark Mode</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] w-full">
                <Keyboard size={16} />
                <span>Shortcuts</span>
              </button>
              <div className="border-t border-[var(--color-border)] my-1" />
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-[#EF4444] hover:bg-[var(--color-bg-danger-subtle)] w-full">
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, CountBadge } from '@/components/ui';
import { currentUser } from '@/data/mockData';
import { useTheme } from '@/components/ThemeProvider';
import {
  Search,
  Sparkles,
  Bell,
  Moon,
  Sun,
  ChevronRight,
} from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopbarProps {
  breadcrumbs?: BreadcrumbItem[];
  sidebarCollapsed: boolean;
  onOpenCommandPalette?: () => void;
}

export function Topbar({ breadcrumbs = [], sidebarCollapsed, onOpenCommandPalette }: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const notifications = [
    {
      id: '1',
      type: 'assignment',
      message: 'Ayşe assigned TP-234 to you',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      message: 'Mehmet commented on TP-189',
      time: '12 min ago',
      read: false,
    },
    {
      id: '3',
      type: 'status',
      message: 'TP-234 moved to QA by John',
      time: '1 hour ago',
      read: true,
    },
    {
      id: '4',
      type: 'sla',
      message: 'TP-301 SLA breach in 2 hours',
      time: '2 hours ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-14 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] flex items-center gap-4 px-6 z-30 transition-all duration-300',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={14} className="text-[var(--color-text-tertiary)]" />}
            {crumb.href ? (
              <a href={crumb.href} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                {crumb.label}
              </a>
            ) : (
              <span className="text-[var(--color-text-primary)] font-medium">{crumb.label}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <button
          onClick={onOpenCommandPalette}
          className="w-full relative"
        >
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <div
            className="w-full h-9 pl-10 pr-4 rounded-lg bg-[var(--color-bg-tertiary)] border border-transparent text-sm text-[var(--color-text-tertiary)] flex items-center cursor-pointer hover:bg-[var(--color-border)] transition-colors"
          >
            Search tickets, projects, people... (⌘K)
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Sparkles size={14} className="text-[var(--color-text-tertiary)]" />
          </div>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* AI Assistant */}
        <button className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] transition-colors" title="AI Assistant">
          <Sparkles size={20} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] shadow-lg z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
                <h3 className="font-semibold text-[var(--color-text-primary)]">Notifications</h3>
                <button className="text-xs text-[var(--color-brand-text)] hover:underline">Mark All as Read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'px-4 py-3 hover:bg-[var(--color-bg-secondary)] cursor-pointer transition-colors',
                      !notification.read && 'bg-[var(--color-brand-light)]'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {!notification.read && (
                        <span className="w-2 h-2 bg-[var(--color-brand-primary)] rounded-full mt-1.5 flex-shrink-0" />
                      )}
                      <div className={cn(!notification.read ? '' : 'ml-5')}>
                        <p className="text-sm text-[var(--color-text-primary)]">{notification.message}</p>
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-[var(--color-border)]">
                <button className="text-sm text-[var(--color-brand-text)] hover:underline w-full text-center">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Avatar */}
        <Avatar
          src={currentUser.avatar}
          name={currentUser.name}
          size="sm"
          className="ml-2"
        />
      </div>
    </header>
  );
}

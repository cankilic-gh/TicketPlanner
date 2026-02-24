'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, CountBadge } from '@/components/ui';
import { currentUser } from '@/data/mockData';
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
}

export function Topbar({ breadcrumbs = [], sidebarCollapsed }: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        'fixed top-0 right-0 h-14 bg-white border-b border-[#E2E8F0] flex items-center gap-4 px-6 z-30 transition-all duration-300',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={14} className="text-[#94A3B8]" />}
            {crumb.href ? (
              <a href={crumb.href} className="text-[#475569] hover:text-[#0F172A]">
                {crumb.label}
              </a>
            ) : (
              <span className="text-[#0F172A] font-medium">{crumb.label}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search tickets, projects, people... (⌘K)"
            className="w-full h-9 pl-10 pr-4 rounded-lg bg-[#F1F5F9] border border-transparent text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Sparkles size={14} className="text-[#94A3B8]" />
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* AI Assistant */}
        <button className="p-2 rounded-lg hover:bg-[#F1F5F9] text-[#475569] transition-colors" title="AI Assistant">
          <Sparkles size={20} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg hover:bg-[#F1F5F9] text-[#475569] transition-colors"
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
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-[#E2E8F0] shadow-lg z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0]">
                <h3 className="font-semibold text-[#0F172A]">Notifications</h3>
                <button className="text-xs text-[#4F46E5] hover:underline">Mark All as Read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'px-4 py-3 hover:bg-[#F8FAFC] cursor-pointer transition-colors',
                      !notification.read && 'bg-[#EEF2FF]'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {!notification.read && (
                        <span className="w-2 h-2 bg-[#4F46E5] rounded-full mt-1.5 flex-shrink-0" />
                      )}
                      <div className={cn(!notification.read ? '' : 'ml-5')}>
                        <p className="text-sm text-[#0F172A]">{notification.message}</p>
                        <p className="text-xs text-[#94A3B8] mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-[#E2E8F0]">
                <button className="text-sm text-[#4F46E5] hover:underline w-full text-center">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-lg hover:bg-[#F1F5F9] text-[#475569] transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
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

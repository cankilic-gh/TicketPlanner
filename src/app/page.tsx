'use client';

import { AppLayout } from '@/components/layout';
import { StatCard } from '@/components/ui';
import { FocusQueue, ActivityFeed, WorkloadChart, AIInsights } from '@/components/dashboard';
import { mockDashboardStats, currentUser } from '@/data/mockData';
import { getGreeting, formatDate } from '@/lib/utils';
import {
  Ticket,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

export default function DashboardPage() {
  const greeting = getGreeting();
  const today = formatDate(new Date());

  return (
    <AppLayout breadcrumbs={[{ label: 'Dashboard' }]}>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0F172A]">
          {greeting}, {currentUser.name.split(' ')[0]}
        </h1>
        <p className="text-[#64748B] mt-1">{today}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          label="My Open Tickets"
          value={mockDashboardStats.myOpenTickets}
          icon={<Ticket size={20} className="text-[#64748B]" />}
        />
        <StatCard
          label="In Progress"
          value={mockDashboardStats.inProgress}
          icon={<Loader2 size={20} className="text-[#64748B]" />}
        />
        <StatCard
          label="Awaiting QA"
          value={mockDashboardStats.awaitingQA}
          icon={<Clock size={20} className="text-[#64748B]" />}
        />
        <StatCard
          label="Overdue"
          value={mockDashboardStats.overdue}
          icon={<AlertTriangle size={20} className="text-[#64748B]" />}
        />
        <StatCard
          label="Resolved This Week"
          value={mockDashboardStats.resolvedThisWeek}
          icon={<CheckCircle2 size={20} className="text-[#64748B]" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <FocusQueue />
          <ActivityFeed />
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          <WorkloadChart />
          <AIInsights />
        </div>
      </div>
    </AppLayout>
  );
}

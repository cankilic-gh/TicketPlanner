'use client';

import { AppLayout } from '@/components/layout';
import { Card, StatCard } from '@/components/ui';
import { HealthScore, FocusQueue, ActivityFeed, WorkloadChart, AIInsights } from '@/components/dashboard';
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F172A]">
            {greeting}, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-[#64748B] mt-1">{today}</p>
        </div>
        <Card className="!p-4">
          <HealthScore
            score={mockDashboardStats.projectHealthScore}
            message={mockDashboardStats.healthMessage}
          />
        </Card>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          label="My Open Tickets"
          value={mockDashboardStats.myOpenTickets}
          trend={mockDashboardStats.myOpenTicketsTrend}
          trendLabel="from last week"
          accentColor="#4F46E5"
          icon={<Ticket size={20} className="text-[#4F46E5]" />}
        />
        <StatCard
          label="In Progress"
          value={mockDashboardStats.inProgress}
          accentColor="#F59E0B"
          icon={<Loader2 size={20} className="text-[#F59E0B]" />}
        />
        <StatCard
          label="Awaiting QA"
          value={mockDashboardStats.awaitingQA}
          accentColor="#EC4899"
          icon={<Clock size={20} className="text-[#EC4899]" />}
        />
        <StatCard
          label="Overdue"
          value={mockDashboardStats.overdue}
          accentColor="#EF4444"
          icon={<AlertTriangle size={20} className="text-[#EF4444]" />}
        />
        <StatCard
          label="Resolved This Week"
          value={mockDashboardStats.resolvedThisWeek}
          trend={mockDashboardStats.resolvedThisWeekTrend}
          accentColor="#10B981"
          icon={<CheckCircle2 size={20} className="text-[#10B981]" />}
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

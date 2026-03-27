'use client';

import { cn } from '@/lib/utils';
import { Sparkles, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

interface AIInsightsProps {
  className?: string;
}

const insights = [
  {
    id: '1',
    type: 'warning',
    icon: <AlertTriangle size={14} className="text-[#F59E0B]" />,
    message: 'TP-0198 has been In Progress for 5 days with no updates. Consider following up with Alex.',
    ticketId: 'TP-0198',
  },
  {
    id: '2',
    type: 'success',
    icon: <TrendingUp size={14} className="text-[#10B981]" />,
    message: "Your team's resolution velocity increased 15% this week. Nice work!",
  },
  {
    id: '3',
    type: 'prediction',
    icon: <Clock size={14} className="text-[#6366F1]" />,
    message: 'Based on current trends, the Kansas Courts project is likely to miss its March 15 deadline by ~4 days. Consider reallocating resources.',
    ticketId: 'p1',
  },
];

export function AIInsights({ className }: AIInsightsProps) {
  return (
    <div className={cn('bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] overflow-hidden', className)}>
      <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--color-border)]">
        <Sparkles size={16} className="text-[#8B5CF6]" />
        <h3 className="font-semibold text-[var(--color-text-primary)]">AI Insights</h3>
      </div>

      <div className="divide-y divide-[var(--color-border)]">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="px-5 py-3 hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <span className="p-1.5 rounded-lg bg-[var(--color-bg-tertiary)] mt-0.5">
                {insight.icon}
              </span>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {insight.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-[var(--color-border)]">
        <Link href="/ai-insights" className="text-sm text-[var(--color-brand-text)] hover:underline">
          View All AI Insights →
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout';
import { Button } from '@/components/ui';
import { TicketTable, TicketFilters, KanbanBoard } from '@/components/tickets';
import { mockTickets } from '@/data/mockData';
import { Plus } from 'lucide-react';

export default function TicketsPage() {
  const [activeView, setActiveView] = useState<'list' | 'board' | 'timeline' | 'calendar'>('list');

  return (
    <AppLayout breadcrumbs={[{ label: 'All Tickets' }]}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">All Tickets</h1>
          <p className="text-[var(--color-text-muted)] mt-1">{mockTickets.length} tickets total</p>
        </div>
        <Button>
          <Plus size={16} />
          <span>New Ticket</span>
        </Button>
      </div>

      {/* Filters */}
      <TicketFilters
        activeView={activeView}
        onViewChange={setActiveView}
        className="mb-6"
      />

      {/* Content based on view */}
      {activeView === 'list' && <TicketTable tickets={mockTickets} />}

      {activeView === 'board' && <KanbanBoard tickets={mockTickets} />}

      {activeView === 'timeline' && (
        <div className="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-8 text-center">
          <p className="text-[var(--color-text-muted)]">Timeline View - Coming Soon</p>
        </div>
      )}

      {activeView === 'calendar' && (
        <div className="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-8 text-center">
          <p className="text-[var(--color-text-muted)]">Calendar View - Coming Soon</p>
        </div>
      )}
    </AppLayout>
  );
}

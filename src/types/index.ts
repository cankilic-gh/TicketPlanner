// Ticket Types
export type TicketStatus =
  | 'new'
  | 'triaged'
  | 'in-dev'
  | 'in-review'
  | 'qa'
  | 'client-review'
  | 'blocked'
  | 'resolved'
  | 'closed'
  | 'reopened';

export type TicketPriority = 'critical' | 'high' | 'medium' | 'low' | 'none';

export type TicketType = 'bug' | 'feature' | 'task' | 'improvement' | 'question' | 'incident';

export type SLAStatus = 'on-track' | 'at-risk' | 'breached';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  aiSummary?: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  projectId: string;
  assigneeIds: string[];
  reporterId: string;
  labels: string[];
  dueDate?: string;
  estimatedTime?: string;
  loggedTime?: string;
  slaStatus?: SLAStatus;
  createdAt: string;
  updatedAt: string;
  aiPredictedEta?: string;
}

// User Types
export type UserRole = 'admin' | 'project-manager' | 'developer' | 'qa' | 'client';

export type WorkloadLevel = 'light' | 'moderate' | 'heavy' | 'overloaded';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  skills: string[];
  openTickets: number;
  workloadLevel: WorkloadLevel;
  isOnline: boolean;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  color: string;
  description: string;
  clientId?: string;
  ticketCount: number;
  openTickets: number;
  resolvedTickets: number;
  overdueTickets: number;
  progress: number;
  lastActivity: string;
}

// Client Types
export interface Client {
  id: string;
  name: string;
  logo?: string;
  primaryContact: string;
  email: string;
  slaCompliance: number;
  activeProjects: number;
  openTickets: number;
}

// Activity Types
export type ActivityType =
  | 'status-change'
  | 'priority-change'
  | 'assignment'
  | 'comment'
  | 'created'
  | 'resolved'
  | 'ai-action';

export interface Activity {
  id: string;
  type: ActivityType;
  ticketId: string;
  ticketTitle: string;
  userId: string;
  userName: string;
  userAvatar: string;
  description: string;
  timestamp: string;
}

// Comment Types
export type CommentVisibility = 'internal' | 'client';

export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: UserRole;
  content: string;
  visibility: CommentVisibility;
  reactions: { emoji: string; count: number; users: string[] }[];
  createdAt: string;
  updatedAt?: string;
}

// Stats Types
export interface DashboardStats {
  myOpenTickets: number;
  myOpenTicketsTrend: number;
  inProgress: number;
  awaitingQA: number;
  overdue: number;
  resolvedThisWeek: number;
  resolvedThisWeekTrend: number;
  projectHealthScore: number;
  healthMessage: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

// Status and Priority Config
export const STATUS_CONFIG: Record<TicketStatus, { label: string; color: string; bgColor: string }> = {
  'new': { label: 'New', color: '#3B82F6', bgColor: '#EFF6FF' },
  'triaged': { label: 'Triaged', color: '#6366F1', bgColor: '#EEF2FF' },
  'in-dev': { label: 'In Dev', color: '#F59E0B', bgColor: '#FFFBEB' },
  'in-review': { label: 'In Review', color: '#8B5CF6', bgColor: '#F5F3FF' },
  'qa': { label: 'QA', color: '#EC4899', bgColor: '#FDF2F8' },
  'client-review': { label: 'Client Review', color: '#06B6D4', bgColor: '#ECFEFF' },
  'blocked': { label: 'Blocked', color: '#EF4444', bgColor: '#FEF2F2' },
  'resolved': { label: 'Resolved', color: '#10B981', bgColor: '#ECFDF5' },
  'closed': { label: 'Closed', color: '#6B7280', bgColor: '#F3F4F6' },
  'reopened': { label: 'Reopened', color: '#F97316', bgColor: '#FFF7ED' },
};

export const PRIORITY_CONFIG: Record<TicketPriority, { label: string; color: string }> = {
  'critical': { label: 'Critical', color: '#DC2626' },
  'high': { label: 'High', color: '#F97316' },
  'medium': { label: 'Medium', color: '#EAB308' },
  'low': { label: 'Low', color: '#3B82F6' },
  'none': { label: 'None', color: '#9CA3AF' },
};

export const TYPE_CONFIG: Record<TicketType, { label: string; icon: string }> = {
  'bug': { label: 'Bug', icon: '🐛' },
  'feature': { label: 'Feature', icon: '✨' },
  'task': { label: 'Task', icon: '🔧' },
  'improvement': { label: 'Improvement', icon: '📋' },
  'question': { label: 'Question', icon: '❓' },
  'incident': { label: 'Incident', icon: '🚨' },
};

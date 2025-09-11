import type { TaskState } from './types';
import { TaskStatus } from '../types/task';
import { STATUS_CONFIG } from '../constants';

export const initialTaskState: TaskState = {
  tasks: [],
  isLoading: false
};

export const generateTaskId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

export const getInitials = (title: string): string => {
  return title.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 1);
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const getStatusConfig = (status: TaskStatus) => {
  return STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG['pending'];
};

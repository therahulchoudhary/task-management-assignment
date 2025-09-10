import type { Task, TaskFormData } from '../types/task';

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

export interface TaskActions {
  // Task CRUD operations
  addTask: (taskData: TaskFormData) => void;
  updateTask: (taskId: string, taskData: TaskFormData) => void;
  deleteTask: (taskId: string) => void;
  getTaskById: (taskId: string) => Task | undefined;
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export interface TaskStore extends TaskState, TaskActions {}


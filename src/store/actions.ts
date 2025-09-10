import type { StateCreator } from 'zustand';
import type { TaskStore } from './types';
import type { TaskFormData } from '../types/task';
import { generateTaskId } from './state';

export const createTaskActions: StateCreator<
  TaskStore,
  [],
  [],
  Pick<TaskStore, keyof import('./types').TaskActions>
> = (set, get) => ({
  // Task CRUD operations
  addTask: (taskData: TaskFormData) => {
    const now = new Date();
    const newTask = {
      id: generateTaskId(),
      ...taskData,
      createdAt: now,
      updatedAt: now
    };
    
    set((state) => ({
      tasks: [...state.tasks, newTask],
      error: null
    }));
  },

  updateTask: (taskId: string, taskData: TaskFormData) => {
    const now = new Date();
    
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, ...taskData, updatedAt: now }
          : task
      ),
      error: null
    }));
  },

  deleteTask: (taskId: string) => {
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== taskId),
      error: null
    }));
  },

  getTaskById: (taskId: string) => {
    const state = get();
    return state.tasks.find(task => task.id === taskId);
  },

  // Utility actions
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  }
});

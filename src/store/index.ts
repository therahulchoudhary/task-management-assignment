import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { TaskStore } from './types';
import { initialTaskState } from './state';
import { createTaskActions } from './actions';

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (...args) => ({
        ...initialTaskState,
        ...createTaskActions(...args)
      }),
      {
        name: 'task-store', // name of the item in storage
        partialize: (state) => ({
          tasks: state.tasks,
          isLoading: state.isLoading
        }),
      }
    )
  )
);

// Export selectors for convenience
export * from './selectors';
export * from './types';
export * from './state';

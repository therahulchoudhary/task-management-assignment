import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { TaskStore } from './types';
import { initialTaskState } from './state';
import { createTaskActions } from './actions';

export const useTaskStore = create<TaskStore>()(
  devtools(
      (...args) => ({
        ...initialTaskState,
        ...createTaskActions(...args)
      })
  )
);

// Export selectors for convenience
export * from './selectors';
export * from './types';
export * from './state';

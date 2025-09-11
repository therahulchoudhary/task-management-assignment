import type { TaskStore } from './types';

// Basic selectors
export const selectTasks = (state: TaskStore) => state.tasks;
export const selectIsLoading = (state: TaskStore) => state.isLoading;

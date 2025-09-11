import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore, selectTasks, selectIsLoading } from '../../store';
import { TaskStatus } from '../../types/task';
import type { Task } from '../../types/task';
import { getStatusConfig } from '../../store/state';
import TaskItem from '../../components/TaskItem/TaskItem';
import TopBar from '../../components/TopBar/TopBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './TaskList.module.css';
import ChevronDown from '../../assets/chevron_down.svg';
import ChevronUp from '../../assets/chevron_up.svg';

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  
  // Use basic selectors to avoid infinite loops
  const tasks = useTaskStore(selectTasks);
  const isLoading = useTaskStore(selectIsLoading);
  
  // Local state for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  
  // Local state for expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<TaskStatus, boolean>>({
    [TaskStatus.IN_PROGRESS]: true,
    [TaskStatus.PENDING]: true,
    [TaskStatus.COMPLETED]: true
  });
  
  // Get individual actions to avoid object recreation
  const deleteTask = useTaskStore(state => state.deleteTask);
  
  // Compute filtered tasks and tasks by status using useMemo to prevent infinite loops
  const filteredTasks = useMemo(() => {
    if (!searchTerm) return tasks;
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);
  
  const tasksByStatus = useMemo(() => {
    return filteredTasks.reduce((acc, task) => {
      if (!acc[task.status]) acc[task.status] = [];
      acc[task.status].push(task);
      return acc;
    }, {} as Record<TaskStatus, typeof filteredTasks>);
  }, [filteredTasks]);

  const handleAddTask = () => {
    navigate('/add');
  };

  const handleEditTask = (task: Task) => {
    navigate(`/edit/${task.id}`);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const handleToggleSection = (status: TaskStatus) => {
    setExpandedSections(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  return (
    <div className={styles.container}>
      <TopBar title="TO-DO App" />

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search To-Do"
      />

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <p>Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No tasks found. Create your first task!</p>
          </div>
        ) : (
          <div className={styles.sections}>
            {[TaskStatus.IN_PROGRESS, TaskStatus.PENDING, TaskStatus.COMPLETED].map((status) => {
              const statusConfig = getStatusConfig(status);
              const statusTasks = tasksByStatus[status] || [];
              const isExpanded = expandedSections[status];

              if (statusTasks.length === 0) return null;

              return (
                <div key={status} className={styles.section}>
                  <div 
                    className={styles.sectionHeader}
                    onClick={() => handleToggleSection(status)}
                  >
                    <span className={styles.sectionTitle}>
                      {statusConfig.label} ({statusTasks.length})
                    </span>
                    <img src={isExpanded ? ChevronUp : ChevronDown} alt='dropdown_icon' />
                  </div>
                  
                  {isExpanded && (
                    <div className={styles.taskList}>
                      {statusTasks.map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          statusConfig={getStatusConfig(task.status)}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button className={styles.fab} onClick={handleAddTask}>
        <span className={styles.fabIcon}>+</span>
      </button>
    </div>
  );
};

export default TaskList;

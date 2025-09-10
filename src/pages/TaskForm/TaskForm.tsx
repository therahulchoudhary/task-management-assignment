import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTaskStore, selectIsLoading, selectError } from '../../store';
import { TaskStatus } from '../../types/task';
import type { TaskFormData } from '../../types/task';
import TopBar from '../../components/TopBar/TopBar';
import { PrimaryButton, GhostButton } from '../../components/Button';
import styles from './TaskForm.module.css';

const TaskForm: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const location = useLocation();
  const isEdit = location.pathname.includes('edit');
  
  // Zustand store selectors
  const isLoading = useTaskStore(selectIsLoading);
  const error = useTaskStore(selectError);
  
  // Get individual actions to avoid object recreation
  const getTaskById = useTaskStore(state => state.getTaskById);
  const addTask = useTaskStore(state => state.addTask);
  const updateTask = useTaskStore(state => state.updateTask);
  const setLoading = useTaskStore(state => state.setLoading);
  const setError = useTaskStore(state => state.setError);
  const clearError = useTaskStore(state => state.clearError);
  
  // Get task by ID using the action method
  const task = taskId ? getTaskById(taskId) : null;
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: TaskStatus.PENDING
  });

  const [errors, setErrors] = useState<Partial<TaskFormData>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: TaskStatus.PENDING
      });
    }
    setErrors({});
  }, [task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof TaskFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<TaskFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setLoading(true);
        clearError();
        
        if (task) {
          updateTask(task.id, formData);
        } else {
          addTask(formData);
        }
        
        // Added a delay to show the loading state
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: TaskStatus.PENDING, label: 'Pending' },
    { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TaskStatus.COMPLETED, label: 'Completed' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <TopBar
          title={task ? 'Edit Task' : 'Add Task'}
          showBackButton={true}
          onBackClick={handleCancel}
        />

        {error && (
          <div className={styles.errorMessage}>
            <p>Error: {error}</p>
            <button onClick={() => clearError()}>Dismiss</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
              placeholder="Enter the title"
              maxLength={100}
            />
            {errors.title && (
              <span className={styles.errorMessage}>{errors.title}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
              placeholder="Enter the description"
              rows={4}
              maxLength={500}
            />
            {errors.description && (
              <span className={styles.errorMessage}>{errors.description}</span>
            )}
          </div>

          {isEdit && <div className={styles.formGroup}>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles.select}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>}

          <div className={styles.formActions}>
            <GhostButton
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </GhostButton>
            <PrimaryButton
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (task ? 'Update' : 'Add')}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

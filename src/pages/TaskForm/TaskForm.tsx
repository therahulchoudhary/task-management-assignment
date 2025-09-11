import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTaskStore, selectIsLoading } from '../../store';
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
  
  // Get individual actions to avoid object recreation
  const getTaskById = useTaskStore(state => state.getTaskById);
  const addTask = useTaskStore(state => state.addTask);
  const updateTask = useTaskStore(state => state.updateTask);
  const setLoading = useTaskStore(state => state.setLoading);
  
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
        
        if (task) {
          updateTask(task.id, formData);
        } else {
          addTask(formData);
        }
        
        // Added a delay to show the loading state
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/');
      } catch (err) {
        console.log(err);
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
              className={styles.textarea}
              placeholder="Enter the description"
              rows={4}
              maxLength={500}
            />
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

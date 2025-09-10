import React from 'react';
import type { Task } from '../../types/task';
import { formatDate, getInitials } from '../../store/state';
import EditIcon from '../../assets/edit_icon.svg';
import DeleteIcon from '../../assets/delete_icon.svg';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  statusConfig: {
    label: string;
    color: string;
  };
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  statusConfig,
  onEdit,
  onDelete
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.taskCardHeader}>
        <div className={styles.taskTitle}>
          <div className={styles.taskTitleIcon}>{getInitials(task.title)}</div>
          <p className={styles.taskTitleText}>{task.title}</p>
        </div>
        <div className={styles.taskStatus}>
          <div
            className={styles.statusDot}
            style={{ backgroundColor: statusConfig.color }}
          />
          <span className={styles.statusText}>
            {statusConfig.label}
          </span>
        </div>
      </div>
      <div className={styles.taskCardBody}>
        <p className={styles.taskDescription}>{task.description}</p>
        <p className={styles.taskDate}>{formatDate(task.createdAt)}</p>
      </div>
      <div className={styles.taskActions}>
        <div className={styles.editButton} onClick={() => onEdit(task)}>
          <img src={EditIcon} alt="Edit" className={styles.actionIcon} />
        </div>
        <div className={styles.deleteButton} onClick={() => onDelete(task.id)}>
          <img src={DeleteIcon} alt="Delete" className={styles.actionIcon} />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;

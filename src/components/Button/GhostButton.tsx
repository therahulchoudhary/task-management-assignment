import React from 'react';
import styles from './Button.module.css';

interface GhostButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const GhostButton: React.FC<GhostButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.ghostButton} ${className}`}
    >
      {children}
    </button>
  );
};

export default GhostButton;

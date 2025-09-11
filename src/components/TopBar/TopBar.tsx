import React from 'react';
import styles from './TopBar.module.css';
import ArrowLeftIcon from '../../assets/arrow_left.svg';

interface TopBarProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: VoidFunction;
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  showBackButton = false,
  onBackClick,
}) => {
  return (
    <div className={styles.header}>
      {showBackButton && (
        <button className={styles.leftButton} onClick={onBackClick}>
          <span className={styles.leftButtonIcon}>
            <img src={ArrowLeftIcon} alt="Back" width={25} height={25} style={{ filter: 'invert(1)' }} />
          </span>
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default TopBar;

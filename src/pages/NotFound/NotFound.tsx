import React from 'react';
import styles from './NotFound.module.css'

const NotFound: React.FC = () => (
  <div className={styles.container}>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default NotFound;
import React from 'react';
import styles from './SearchBar.module.css';
import SearchIcon from '../../assets/search_icon.svg';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search To-Do'
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInput}>
        <img src={SearchIcon} alt="Search"/>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default SearchBar;

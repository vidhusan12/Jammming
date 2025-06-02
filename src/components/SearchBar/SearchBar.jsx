import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {
  return (
    <div className={styles.SearchBar}>
      <input className={styles.SearchInput} placeholder="Enter A Song, Album, or Artist" />
      <button className={styles.SearchButton}>Search</button>
    </div>
  );
}

export default SearchBar;
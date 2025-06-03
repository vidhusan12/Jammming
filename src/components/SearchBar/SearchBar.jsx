import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({onSearch}) {
  const [term, setTerm] = useState('');
  return (
    <div className={styles.SearchBar}>
      <input className={styles.SearchInput} value={term} onChange={e => setTerm(e.target.value)} placeholder="Enter A Song, Album, or Artist" />
      <button onClick={() => onSearch(term)} className={styles.SearchButton}>Search</button>
    </div>
  );
}

export default SearchBar;
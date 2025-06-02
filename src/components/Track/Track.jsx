import React from 'react';
import styles from './Track.module.css';

function Track({ id, name, artist, album, addTrack }) {
  return (
    <div className={styles.Track}>
      <div className={styles['Track-information']}>
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
      <button
        className={styles['Track-action']}
        onClick={() => addTrack({ id, name, artist, album })}
      >
        +
      </button>
    </div>
  );
}

export default Track;
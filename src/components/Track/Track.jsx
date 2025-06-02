import React from 'react';
import styles from './Track.module.css';

function Track({ id, name, artist, album, addTrack, isRemoval, removeTrack }) {
  return (
    <div className={styles.Track}>
      <div className={styles['Track-information']}>
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
      {isRemoval
        ? <button className={styles['Track-action']} onClick={() => removeTrack({ id, name, artist, album })}>-</button>
        : <button className={styles['Track-action']} onClick={() => addTrack({ id, name, artist, album })}>+</button>
      }
    </div>
  );
}

export default Track;
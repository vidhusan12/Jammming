import React from 'react';
import styles from './Tracklist.module.css';
import Track from '../Track/Track';

function Tracklist({ tracks = [], addTrack, isRemoval, removeTrack }) {
  return (
    <div className={styles.TrackList}>
      {tracks.map(track => (
        <Track
          key={track.id}
          id={track.id}
          name={track.name}
          artist={track.artist}
          album={track.album}
          addTrack={addTrack}
          removeTrack={removeTrack}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
}

export default Tracklist;
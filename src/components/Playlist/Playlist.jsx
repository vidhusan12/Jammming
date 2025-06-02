import React from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({ playlistName, tracks }) {
  return (
    <div className={styles.Playlist}>
      <input value={playlistName} readOnly />
      <Tracklist tracks={tracks} />
      <button className={styles['Playlist-save']}>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
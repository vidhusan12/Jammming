import React from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({ playlistName, setPlaylistName, tracks, isRemoval, removeTrack, savePlaylist }) {
  return (
    <div className={styles.Playlist}>
      <input onChange={e => setPlaylistName(e.target.value)} value={playlistName} />
      <Tracklist tracks={tracks} isRemoval={isRemoval} removeTrack={removeTrack} />
      <button onClick={savePlaylist} className={styles['Playlist-save']}>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
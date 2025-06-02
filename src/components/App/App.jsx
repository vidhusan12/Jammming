import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Song A', artist: 'Artist A', album: 'Album A' },
    { id: 2, name: 'Song B', artist: 'Artist B', album: 'Album B' },
    { id: 3, name: 'Song C', artist: 'Artist C', album: 'Album C' }
  ]);

  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 1, name: 'Song A', artist: 'Artist A', album: 'Album A' },
    { id: 2, name: 'Song B', artist: 'Artist B', album: 'Album B' }
  ]);

  function addTrack(track) {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  }

  return (
    <div className={styles.App}>
      <h1>
        Jammming <span className="highlight">App</span>
      </h1>
      <SearchBar />
      <div className={styles['App-playlist']}>
        <SearchResults searchResults={searchResults} addTrack={addTrack} />
        <Playlist playlistName={playlistName} tracks={playlistTracks} />
      </div>
    </div>
  );
}

export default App;
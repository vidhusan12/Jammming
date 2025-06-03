import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Song A', artist: 'Artist A', album: 'Album A', uri: 'spotify:track:abc123' },
    { id: 2, name: 'Song B', artist: 'Artist B', album: 'Album B', uri: 'spotify:track:def456' },
    { id: 3, name: 'Song C', artist: 'Artist C', album: 'Album C', uri: 'spotify:track:ghi789' }
  ]);

  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 1, name: 'Song A', artist: 'Artist A', album: 'Album A', uri: 'spotify:track:abc123' },
    { id: 2, name: 'Song B', artist: 'Artist B', album: 'Album B', uri: 'spotify:track:def456' },
    { id: 3, name: 'Song C', artist: 'Artist C', album: 'Album C', uri: 'spotify:track:ghi789' }
  ]);

  function addTrack(track) {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  }

  function removeTrack(track) {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  }

  function savePlaylist() {
    const trackUris = playlistTracks.map(track => track.uri);
    console.log("Saving playlist with URIs: ", trackUris);
    setPlaylistName("New Playlist"); //resets the playlsit
    setPlaylistTracks([]); //resets the playlist Track

  }

  return (
    <div className={styles.App}>
      <h1>
        Jammming <span className="highlight">App</span>
      </h1>
      <SearchBar />
      <div className={styles['App-playlist']}>
        <SearchResults searchResults={searchResults} addTrack={addTrack} />
        <Playlist
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          tracks={playlistTracks}
          isRemoval={true}
          removeTrack={removeTrack}
          savePlaylist={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
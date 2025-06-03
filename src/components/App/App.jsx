import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../Spotify';

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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function addTrack(track) {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  }

  function removeTrack(track) {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  }

  async function savePlaylist() {
    const trackUris = playlistTracks.map(track => track.uri);
    console.log("Saving playlist with URIs: ", trackUris);
    setLoading(true);
    setSuccess(false)
    await Spotify.savePlaylist(playlistName, trackUris);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    setPlaylistName("New Playlist"); //resets the playlsit
    setPlaylistTracks([]); //resets the playlist Track

  }

  async function getProfile() {
    const accessToken = await Spotify.getAccessToken();

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    const data = await response.json();
    console.log(data); // Should show your Spotify profile info
  }

  async function searchSpotify(term) {
    const results = await Spotify.search(term); // <-- await here
    setSearchResults(results);
  }


  return (
    <div className={styles.App}>
      <h1>
        Jammming <span className="highlight">App</span>
      </h1>
      <SearchBar onSearch={searchSpotify} />
      {loading && <div className={styles.spinner}></div>}
      {success && <div className={styles.success}>Playlist saved!</div>}

      <div className={styles['App-playlist']}>
        <SearchResults searchResults={searchResults} addTrack={addTrack} />
        <Playlist
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          tracks={playlistTracks}
          isRemoval={true}
          removeTrack={removeTrack}
          savePlaylist={savePlaylist}
          disabled={loading}
        />
      </div>
    </div>
  );
}

export default App;
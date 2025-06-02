import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';



function App() {
  
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Song A', artist: 'Artist A', album: 'Album A' },
    { id: 2, name: 'Song B', artist: 'Artist B', album: 'Album B' }
  ]);
  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <SearchResults searchResults={searchResults}/>
        <Playlist />
      </div>
    </div>
  );
}

export default App;
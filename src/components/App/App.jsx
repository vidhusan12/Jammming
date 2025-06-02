import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
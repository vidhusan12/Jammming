import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import Track from '../Track/Track';

function SearchResults({ searchResults }) {
  const trackComponents = searchResults.map(track => {
    return (
      <Track
        key={track.id}
        name={track.name}
        artist={track.artist}
        album={track.album}
      />
    );
  });
  return (
    <div>
      <h2>Results</h2>
      <Tracklist>{trackComponents}</Tracklist>
    </div>
  );
}

export default SearchResults;
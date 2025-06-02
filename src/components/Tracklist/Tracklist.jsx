import React from 'react';
import Track from '../Track/Track';

function Tracklist() {
  // Add 3 mock tracks for now
  return (
    <div>
      <Track name="Song 1" artist="Artist 1" album="Album 1" />
      <Track name="Song 2" artist="Artist 2" album="Album 2" />
      <Track name="Song 3" artist="Artist 3" album="Album 3" />
    </div>
  );
}

export default Tracklist;
import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

function Playlist() {
  return (
    <div>
      <input value="New Playlist" readOnly />
      <Tracklist />
      <button>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
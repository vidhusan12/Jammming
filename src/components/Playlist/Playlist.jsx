import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({playlistName, playlistTracks}) {
  return (
    <div>
      <input value={playlistName} readOnly />
      <Tracklist tracks={playlistTracks}/>
      <button>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
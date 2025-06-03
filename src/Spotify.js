let accessToken = '';
let expiresIn = 0; // the expiration time

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);

      localStorage.setItem('access_token', accessToken);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);

      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const clientId = 'b1c6fbb44a704c81968e06a3242d0fef';
      const redirectUri = 'http://127.0.0.1:3000/';
      const scopes = 'playlist-modify-public';

      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectUri}`;
      window.location = authUrl;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  }
};

export default Spotify;
import { generateCodeVerifier, generateCodeChallenge } from './pkce';

let accessToken = '';

const clientId = 'b1c6fbb44a704c81968e06a3242d0fef';
const redirectUri = 'http://127.0.0.1:3000/';
const scopes = 'playlist-modify-public';

const Spotify = {
  async getAccessToken() {
    if (accessToken) return accessToken;

    // 1. Check for code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      // 2. No code: start auth flow
      const codeVerifier = generateCodeVerifier();
      localStorage.setItem('pkce_code_verifier', codeVerifier);
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
      window.location = authUrl;
      return;
    } else {
      // 3. Code present: exchange for token
      const codeVerifier = localStorage.getItem('pkce_code_verifier');
      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier
      });

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      const data = await response.json();
      accessToken = data.access_token;
      window.history.replaceState({}, document.title, '/'); // Clean up URL
      return accessToken;
    }
  },

  async search(term) {
    const token = await this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },

  async savePlaylist(name, uris) {
    if (!name || !uris.length) return;
    const token = await this.getAccessToken();
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + token }
    });

    const userData = await userResponse.json();
    const userId = userData.id;

    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: 'Created with Jammming',
        public: true
      })
    });
    const playlistData = await playlistResponse.json();
    const playlistId = playlistData.id;

    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: uris
      })
    });

  }
};

export default Spotify;
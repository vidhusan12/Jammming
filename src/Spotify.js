let accessToken = '';
let expiresIn = 0; // the expiration time

const Spotify = {
  getAccessToken() {
    //If we already have the token return it
    if (accessToken) {
      return accessToken
    };
    // check the URL for the token
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = expiresInMatch[1];

      //Store it in localStorage so you can use it in getProfile()
      localStorage.setItem('access_token', accessToken);

      //Set a timeout to clear the token when it expires
      window.setTimeout(() => accessToken = '', expiresIn * 3600);

      //Clean the URL
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      //Redirect to Spotify login
      const clientId = '';
      const redirectUri = 'http://localhost:3000/';
      const scopes = 'playlist-modify-public';

      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectUri}`;
      window.location = authUrl;
    }
  }
};


export default Spotify;
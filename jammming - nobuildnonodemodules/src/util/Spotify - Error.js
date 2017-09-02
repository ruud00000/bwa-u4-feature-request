// data for accessing Spotify API
const clientId = '85e1af00a8d94b68b351311c467c5af3';
const redirectUri = 'http://localhost:3000/';
const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
let accessToken;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }

    // Check if accessToken has just been obtained
    let currentUrl = window.location.href;
    if (currentUrl.match(/access_token=([^&]*)/) && currentUrl.match(/expires_in=([^&]*)/)) {
        accessToken = currentUrl.match(/access_token=([^&]*)/);
        const expiresIn = currentUrl.match(/expires_in=([^&]*)/);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
    }

    // If not then get an accessToken
    if (!accessToken && !currentUrl.match(/access_token=([^&]*)/)) {
      window.location = url;
      //retrieve accessToken from the url Spotify now redirects to...
    }
  },

  search: async function(term) {
    accessToken = Spotify.getAccessToken()[1];
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    try {
      let response = await fetch(
        searchUrl,
        { headers: { Authorization: `Bearer ${accessToken}` }});
      if (response.ok) {
        let jsonResponse = await response.json();
        let tracks = jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri };
          }
        );
        return tracks ? tracks : [];
      }
      throw new Error('Request failed!');
    }
    catch (error) {
      console.log(error);
    }
  },

  save: async function(tracks, name) {
    if (!tracks || !name) {
      return;
    }
    accessToken = Spotify.getAccessToken()[1];
    let userId = '';
    let playlistId = '';

    // GET current user's ID
    try {
      let response = await fetch(
        'https://api.spotify.com/v1/me',
        { headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (response.ok) {
        let jsonResponse = await response.json();
        userId = jsonResponse.id;
      }
      throw new Error('Request for User ID failed!');
    }
    catch(error) {
      console.log(error);
    }

    // POST a new Playlist, without tracks
    try {
      let response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          body: JSON.stringify({
            name: name,
            public: false
           }),
           headers: {
             Authorization: `Bearer ${accessToken}`,
             'Content-Type': 'application/json'
           }
        }
      );

      if (response.ok) {
        let jsonResponse = await response.json();
        playlistId = jsonResponse.id;
      }
      throw new Error('Request save new playlist failed!');
    }
    catch(error) {
      console.log(error);
    }

    // POST tracks to the new Playlist
    try {
      let response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          method: 'POST',
          body: JSON.stringify({
            uris: {tracks}
           }),
           headers: {
             Authorization: `Bearer ${accessToken}`,
             'Content-Type': 'application/json'
           }
        }
      );
      if (response.ok) {
        let jsonResponse = await response.json();
        const snapshotId = jsonResponse.snapshot_id;
      }
      throw new Error('Request save new playlist failed!');
    }
    catch(error) {
      console.log(error);
    }
  }
}

export default Spotify;

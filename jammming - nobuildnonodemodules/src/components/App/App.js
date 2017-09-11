import React, { Component } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResultTracks } from '../SearchResultTracks/SearchResultTracks';
import { PlayListTracks } from '../PlayListTracks/PlayListTracks';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playListTracks: [],
      searchResultTracks: [],
      addedTracks: []
     };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  searchSpotify(term) {
    console.log(`Searching Spotify with ${term}`);
    return Spotify.search(term)
    .then(tracks => this.setState( { searchResultTracks: tracks } ));
  }

  addTrack(track) {
    if (this.state.playListTracks.findIndex(playListTrack => playListTrack.id === track.id) === -1 ) {
      const addedArray = this.state.addedTracks;
      addedArray.push(track.id);
      addedArray.sort();
      this.setState({ addedTracks: addedArray });
      const playListArray = this.state.playListTracks;
      playListArray.push(track);
      this.setState({ playListTracks: playListArray });
      // const searchResultArray = this.state.searchResultTracks;
      // searchResultArray[index].added = true;
      // this.setState({ searchResultTracks: searchResultArray });
    } else {
      console.log(`Track with id ${track.id} is already in the Playlist`)
    }
  }

  removeTrack(index) {
    const id = this.state.playListTracks[index].id;
    const tracksWithThisId = this.state.playListTracks.filter(track => track.id === id);
    if (tracksWithThisId.length===1) {
      const tracksArray = this.state.searchResultTracks;
      const trackIndex = this.state.searchResultTracks.findIndex(track => track.id === id);
      tracksArray[trackIndex].added = '';
    }
    const playListArray = this.state.playListTracks;
    playListArray.splice(index,1);
    this.setState({ playListTracks: playListArray });
  }

  saveToSpotify(tracks, name) {
    const playListTracks = tracks.map(track => JSON.stringify(track)).join('\n');
    console.log(`Saving tracks: \n${playListTracks} \nto Spotify to Playlist ${name}`);
    const uris = tracks.map(track => `${track.uri}`)
    return Spotify.save(uris, name)
    .then(console.log('Playlist saved to Spotify'));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResultTracks
              addTrack={this.addTrack}
              searchResultTracks={this.state.searchResultTracks}
              addedTracks={this.state.addedTracks} />
            <PlayListTracks
              removeTrack={this.removeTrack}
              playListTracks={this.state.playListTracks}
              saveToSpotify={this.saveToSpotify} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

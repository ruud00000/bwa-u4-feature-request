import React, { Component } from 'react';
import './PlayListTracks.css';
import { TrackList } from '../TrackList/TrackList';

export class PlayListTracks extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'New Playlist' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleNameChange(e) {
    const name = e.target.value;
    this.setState({ name: name });
  }

  handleSave(e) {
    this.props.saveToSpotify(this.props.playListTracks, this.state.name);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          onChange={this.handleNameChange}
          value={this.state.name} />
        <TrackList
          removeTrack={this.props.removeTrack}
          action='-'
          tracks={this.props.playListTracks} />
        <a
          onClick={this.handleSave}
          className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

import React, { Component } from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends Component {
  render() {
    const tracks = this.props.tracks.map((track, id) =>
      <Track
        key={`track_${id}`}
        id={id}
        addTrack={this.props.addTrack}
        removeTrack={this.props.removeTrack}
        action={this.props.action}
        track={track}/>);
    return (
      <div className="TrackList">
        {tracks}
      </div>
    );
  }
}

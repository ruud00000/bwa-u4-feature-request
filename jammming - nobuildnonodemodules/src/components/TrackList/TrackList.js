import React, { Component } from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends Component {
  render() {
    const tracks = this.props.tracks.map((track, id) => {
      let added = '';
      if (this.props.action === '+') {
        if (this.props.addedTracks.findIndex(addedTrack => addedTrack === track.id) !== -1) {
          added = true;
        }
      }
      return <Track
        key={`track_${id}`}
        id={id}
        addTrack={this.props.addTrack}
        removeTrack={this.props.removeTrack}
        action={this.props.action}
        track={track}
        added={added} />;
      }
    );
    return (
      <div className="TrackList">
        {tracks}
      </div>
    );
  }
}

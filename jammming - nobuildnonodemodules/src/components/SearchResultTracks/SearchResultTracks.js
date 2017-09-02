import React, { Component } from 'react';
import './SearchResultTracks.css';
import { TrackList } from '../TrackList/TrackList';

export class SearchResultTracks extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          addTrack={this.props.addTrack}
          action='+'
          tracks={this.props.searchResultTracks} />
      </div>
    );
  }
}

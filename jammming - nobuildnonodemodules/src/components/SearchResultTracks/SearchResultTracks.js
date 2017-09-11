import React from 'react';
import './SearchResultTracks.css';
import { TrackList } from '../TrackList/TrackList';

export function SearchResultTracks(props) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList
        addTrack={props.addTrack}
        action='+'
        tracks={props.searchResultTracks}
        addedTracks={props.addedTracks} />
    </div>
  );
}

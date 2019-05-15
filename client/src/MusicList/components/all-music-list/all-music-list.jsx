import React, { Component } from 'react';

import AllMusicItem from '../all-music-item/all-music-item';
import './all-music-list.css';

class AllMusicList extends Component {
  render() {
    const { songsList } = this.props;
    return (
      <ul className="music-list">
      {
        songsList.map(({ id, text }) => (
          <AllMusicItem 
            id={id} 
            key={id} 
            text={text} />
        ))
      }
      </ul>
    )
  }
}

export default AllMusicList;

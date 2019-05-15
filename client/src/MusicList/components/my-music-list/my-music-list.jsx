import React, { Component } from 'react';

import MyMusicItem from '../my-music-item/my-music-item';
import './my-music-list.css';

class MusicList extends Component {
  
  render() {
    const { songsList, removeSong } = this.props;

    return (
      <ul className="music-list">
      {
        songsList.map(({ id, text }) => (
          <MyMusicItem 
            removeSong={removeSong} 
            id={id} 
            key={id} 
            text={text}  />
        ))
      }
      </ul>
    )
  }
}

export default MusicList;

import React, { Component } from 'react';
import axios from 'axios';

import './all-music-item.css';

class AllMusicItem extends Component {

  state = {
    liked: false
  }
  
  likeSong = () => {
    const userId = localStorage.getItem('user');
    const { text } = this.props

    this.setState({
      liked: !this.stateliked,
    });

    axios.post(`http://localhost:3001/musicList/likeSong/`,
      { userId, text }
    ).catch(err => console.log('err', err))
  }

  render() {
    const { text } = this.props
    const { liked } = this.state

    return (
      <li className="music-item1">
          <button className='like' onClick={this.likeSong}>+ </button>
          <span className='text'>{text}</span>
      </li>
    );
  }
}

export default AllMusicItem;
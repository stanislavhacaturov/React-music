import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './my-music-item.css';

class MyMusicItem extends Component {

  deleteSong = () => {
    const { id } = this.props;

    axios.post(`http://localhost:3001/musicList/deleteSong/`,
      { id }
    ).catch(err => console.log('err', err));
  }

  render() {
    const { text, removeSong, id } = this.props;

    return (
      <Fragment>
        <li className="music-item">
            <span className='text'>{text}</span>
            <i onClick={() => removeSong(id)} className="fas fa-times" />
        </li>
      </Fragment>
    );
  }
}

export default MyMusicItem;
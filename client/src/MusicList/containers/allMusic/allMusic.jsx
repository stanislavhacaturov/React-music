import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { addList } from '../../actions/creator';

import AllMusicList from '../../components/all-music-list/all-music-list';
import Footer from '../../components/footer/footer';

import '../stylesCont.css';

class AllMusic extends Component {

  state = {
    song1: 'Song 1',
    song2: 'Song 2',
    song3: 'Song 3'
  }

  componentWillMount() {
    axios.post(`http://localhost:3001/musicList/allMusic`)
      .then(result => {

        const data = result.data;
        const { addList } = this.props;
        const { songs } = this.props;
        
        if (songs.length < 1) {
          data.forEach(function (Item) {
            addList(Item.id, Item.song)
          });
        }
      })
      .catch(err => err);
  }

  componentDidMount() {
    const { song1, song2, song3 } = this.state;

    axios.post(`http://localhost:3001/musicList/addSong`,
      { song1, song2, song3 }
    ).catch(err => console.log('err', err))
  }

  getActiveSongsCounter = songs => songs.filter(songs => !songs.done).length;

  render() {
    const { songs } = this.props
    const isSongsExist = songs && songs.length > 0;
    const getActiveSongsCounter = this.getActiveSongsCounter(songs);

    return (
      <div className="music-wrapper">        
        <Link to='/profile' className='link1'>My profile</Link>
        <Link to='/mymusic' className='link2'>My music</Link>
        <h1>Music list</h1>

        {isSongsExist &&
          <AllMusicList
            songsList={songs} />}
          
        {isSongsExist &&
          <Footer
            active={getActiveSongsCounter} />}
      </div>
    );
  }
}

export default connect(state => ({
  songs: state.songs
}), { addList })(AllMusic);

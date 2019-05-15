import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { removeSong, addMyList, reload } from '../../actions/creator';

import MusicList from '../../components/my-music-list/my-music-list';
import Footer from '../../components/footer/footer';

import '../stylesCont.css';

class MyMusic extends Component {

  componentDidMount() {
    const { reload } = this.props
    reload()
    const userId = localStorage.getItem('user');
    axios.post(`http://localhost:3001/musicList/myMusic`,
      { userId}
    ).then(result => {
        const data = result.data;
        const { addMyList } = this.props;
        const { mySongs } = this.props;
        
        data.forEach(function (MyMusic) {
          addMyList(MyMusic.id, MyMusic.song)
        });
        
      })
      .catch(err => err);
  }

  getActiveSongsCounter = mySongs => mySongs.filter(mySongs => !mySongs.done).length;

  render() {
    const { mySongs, removeSong } = this.props
    const isSongsExist = mySongs && mySongs.length > 0;
    const getActiveSongsCounter = this.getActiveSongsCounter(mySongs);

    return (
      <div className="music-wrapper">        
        <Link to='/music' className='link1'>All music</Link>
        <Link to='/profile' className='link2'>My profile</Link>
        <h1>My music</h1>

        {isSongsExist &&
          <MusicList
            songsList={mySongs}
            removeSong={removeSong} />}

        {isSongsExist &&
          <Footer
            active={getActiveSongsCounter} />} 
      </div>
    );
  }
}

export default connect(state => ({
  mySongs: state.mySongs,
}), { removeSong, addMyList, reload })(MyMusic);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import UserName from '../../components/profileEdit/username';
import LastName from '../../components/profileEdit/lastname';
import Email from '../../components/profileEdit/email';
import Password from '../../components/profileEdit/password';

import '../stylesCont.css';

class Profile extends Component {
  logOut = () => {
    localStorage.clear();
  }

  render() {
    return (
      <div className="music-wrapper">
      <Link to='/mymusic' className='link1'>My music</Link>
      <Link to='/music' className='link2'>All music</Link>
        <h1>Profile</h1>
          <ul className='profile'>
            {<UserName />}
            {<LastName />}
            {<Email />}
            {<Password />}           
          </ul>
      <Link to='/' onClick={this.logOut} className='link3'>Log out</Link>
      </div>
    );
  }
}

export default Profile;
